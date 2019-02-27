package com.nekolaboratory;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.content.pm.Signature;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * @author Yusuke Arakawa
 */

public class Alchem1c {
    public static String getSignature(Context context) throws PackageManager.NameNotFoundException {
        return context.getPackageManager().getPackageInfo(context.getPackageName(), PackageManager.GET_SIGNATURES).signatures[0].toCharsString();
    }

    public static void injectSignature(Context context, String signature) throws Exception {
        Class<?> activityThreadClass = Class.forName("android.app.ActivityThread");
        Object currentActivityThread = activityThreadClass.getDeclaredMethod("currentActivityThread", new Class[0]).invoke(null, new Object[0]);
        Field sPackageManagerField = activityThreadClass.getDeclaredField("sPackageManager");
        sPackageManagerField.setAccessible(true);
        Class localClass = Class.forName("android.content.pm.IPackageManager");
        Object proxy = Proxy.newProxyInstance(localClass.getClassLoader(), new Class[]{localClass}, new PackageInfoInvocationHandler(sPackageManagerField.get(currentActivityThread), signature, context.getPackageName()));
        sPackageManagerField.set(currentActivityThread, proxy);
        PackageManager packageManager = context.getPackageManager();
        Field mPmField = packageManager.getClass().getDeclaredField("mPM");
        mPmField.setAccessible(true);
        mPmField.set(packageManager, proxy);
    }
}

class PackageInfoInvocationHandler implements InvocationHandler {
    private Object base;
    private String signature;
    private String packageName;

    public PackageInfoInvocationHandler(Object base, String signature, String packageName) {
        this.base = base;
        this.signature = signature;
        this.packageName = packageName;
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        if ("getPackageInfo".equals(method.getName())) {
            if ((Integer) args[1] == PackageManager.GET_SIGNATURES && this.packageName.equals(args[0])) {
                PackageInfo packageInfo = (PackageInfo) method.invoke(this.base, args);
                packageInfo.signatures[0] = new Signature(this.signature);
                return packageInfo;
            }
        }
        return method.invoke(this.base, args);
    }
}
