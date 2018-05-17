package com.coinsinfo.log;

import android.os.Environment;
import android.util.Log;

import com.coinsinfo.BuildConfig;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

public class LogUtils {

    private static File log;

    public static boolean isLogEnable = BuildConfig.DEBUG;
    private static PrintWriter ps;

    static {
        log = new File(Environment.getExternalStorageDirectory(), "rnLog.log");
        FileOutputStream fs = null;
        try {
            fs = new FileOutputStream(log, true);
        } catch (FileNotFoundException e) {
        }
        OutputStreamWriter sw = new OutputStreamWriter(fs);
        BufferedWriter output = new BufferedWriter(sw);
        ps = new PrintWriter(output, true);


    }

    public static void d(String tag, String msg) {
        if (isLogEnable) {
            String finalMsg = "";
            d(tag, msg, null);
        }
    }

    public static void d(String tag, String msg, Throwable tr) {

        if (!isLogEnable) {
            return;
        }
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String date = df.format(new Date());

        final String finalStr = date + " T" + Thread.currentThread().getId()
                + "tag:" + tag + "msg:" + msg + "tr:" + Log.getStackTraceString(tr);

        LocateSingleThreadPool.getInstance().submit(new Runnable() {
            @Override
            public void run() {
                Log.d("rnlog", finalStr);
                ps.println(finalStr);
                ps.flush();
            }
        });


    }


}
