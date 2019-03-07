const Fs = require('fs')
const Os = require('os')
const rimraf = require('rimraf')
const Shell = require('electron').shell
const execSync = require('child_process').execSync

class Generator {
  toChars(signature) {
    var sig = signature;
    var N = sig.length;
    var N2 = N * 2;
    var text = (function (s) {
      var a = []; while (s-- > 0)
        a.push(null); return a;
    })(N2);
    for (var j = 0; j < N; j++) {
      {
        var v = sig[j];
        var d = (v >> 4) & 15;
        text[j * 2] = String.fromCharCode((d >= 10 ? ('a'.charCodeAt(0) + d - 10) : ('0'.charCodeAt(0) + d)));
        d = v & 15;
        text[j * 2 + 1] = String.fromCharCode((d >= 10 ? ('a'.charCodeAt(0) + d - 10) : ('0'.charCodeAt(0) + d)));
      }
    }
    return text;
  }

  loadCertificates(jarFile, jarEntry, readBuffer) {
    var InputStream = Java.type("java.io.InputStream")
		try {
			InputStream inputStream = jarFile.getInputStream(jarEntry)
			while (inputStream.read(readBuffer, 0, readBuffer.length) != -1) {
			}
			inputStream.close()
			return (Certificate[]) (jarEntry != null ? jarEntry.getCertificates() : null)
		} catch (Exception e) {
		}
		return null
  }

  getApkSignInfo(apkFilePath) {
    var readBuffer = new byte[8192]
    var Certificate = Java.type("java.security.cert.Certificate")
    var Enumeration = Java.type("java.util.Enumeration")
    var JarEntry = Java.type("java.util.jar.JarEntry")
    var JarFile = Java.type("java.util.jar.JarFile")

		Certificate[] certs = null;
		try {
			var jarFile = new JarFile(apkFilePath)
			Enumeration<?> entries = jarFile.entries();
			while (entries.hasMoreElements()) {
				JarEntry jarEntry = (JarEntry) entries.nextElement();
				if (jarEntry.isDirectory()) {
					continue;
				}
				if (jarEntry.getName().startsWith("META-INF/")) {
					continue;
				}
				Certificate[] localCerts = loadCertificates(jarFile, jarEntry, readBuffer)
				if (certs == null) {
					certs = localCerts
				} else {
					for (int i = 0; i < certs.length; i++) {
						boolean found = false
						for (int j = 0; j < localCerts.length; j++) {
							if (certs[i] != null && certs[i].equals(localCerts[j])) {
								found = true
								break
							}
						}
						if (!found || certs.length != localCerts.length) {
							jarFile.close()
							return null
						}
					}
				}
			}
			jarFile.close()
			return new String(toChars(certs[0].getEncoded()))
		} catch (Exception e) {
			e.printStackTrace()
		}
		return null
  }

  idioms(file) {
    return file
  }
}


module.exports = Generator
