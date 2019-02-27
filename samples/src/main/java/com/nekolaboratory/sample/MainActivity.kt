package com.nekolaboratory.sample

import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.util.Log
import com.nekolaboratory.Alchem1c

/**
 * @author Yusuke Arakawa
 */

class MainActivity : AppCompatActivity() {

    val INJECT_SIGNATURE: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        var sig: String = Alchem1c.getSignature(this)
        Log.d("Alchem1c", "Original Signature hashcode : " + sig)
        if (INJECT_SIGNATURE.isBlank())
            Alchem1c.injectSignature(this, sig)
        else
            Alchem1c.injectSignature(this, INJECT_SIGNATURE)
        sig = Alchem1c.getSignature(this)
        Log.d("Alchem1c", "Injected Signature hashcode : " + sig)
    }
}
