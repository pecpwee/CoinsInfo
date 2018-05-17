package com.coinsinfo;

import android.app.Application;

import com.coinsinfo.log.LogUtils;
import com.facebook.common.logging.FLog;
import com.facebook.common.logging.LoggingDelegate;
import com.facebook.debug.debugoverlay.model.DebugOverlayTag;
import com.facebook.debug.holder.Printer;
import com.facebook.debug.holder.PrinterHolder;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.horcrux.svg.SvgPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new SvgPackage()
            );
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        FLog.setMinimumLoggingLevel(FLog.VERBOSE);
        FLog.setLoggingDelegate(new LoggingDelegate() {
            @Override
            public void setMinimumLoggingLevel(int level) {

            }

            @Override
            public int getMinimumLoggingLevel() {
                return 0;
            }

            @Override
            public boolean isLoggable(int level) {
                return true;
            }

            @Override
            public void v(String tag, String msg) {


            }

            @Override
            public void v(String tag, String msg, Throwable tr) {
                LogUtils.d(tag, msg, tr);
            }

            @Override
            public void d(String tag, String msg) {
                LogUtils.d(tag, msg);

            }

            @Override
            public void d(String tag, String msg, Throwable tr) {
                LogUtils.d(tag, msg, tr);

            }

            @Override
            public void i(String tag, String msg) {
                LogUtils.d(tag, msg);

            }

            @Override
            public void i(String tag, String msg, Throwable tr) {
                LogUtils.d(tag, msg, tr);

            }

            @Override
            public void w(String tag, String msg) {
                LogUtils.d(tag, msg);

            }

            @Override
            public void w(String tag, String msg, Throwable tr) {
                LogUtils.d(tag, msg, tr);

            }

            @Override
            public void e(String tag, String msg) {
                LogUtils.d(tag, msg);

            }

            @Override
            public void e(String tag, String msg, Throwable tr) {
                LogUtils.d(tag, msg, tr);

            }

            @Override
            public void wtf(String tag, String msg) {
                LogUtils.d(tag, msg);

            }

            @Override
            public void wtf(String tag, String msg, Throwable tr) {
                LogUtils.d(tag, msg, tr);

            }

            @Override
            public void log(int priority, String tag, String msg) {
                LogUtils.d(tag, msg);

            }
        });
        PrinterHolder.setPrinter(new Printer() {
            @Override
            public void logMessage(DebugOverlayTag tag, String message, Object... args) {
                LogUtils.d("pholder:" + tag.name + tag.description + tag.color, message);

            }

            @Override
            public void logMessage(DebugOverlayTag tag, String message) {
                LogUtils.d("pholder:" + tag.name + tag.description + tag.color, message);

            }

            @Override
            public boolean shouldDisplayLogMessage(DebugOverlayTag tag) {
                return true;
            }
        });
    }
}
