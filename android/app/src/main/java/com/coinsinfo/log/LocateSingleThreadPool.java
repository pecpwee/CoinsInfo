package com.coinsinfo.log;

import android.support.annotation.NonNull;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class LocateSingleThreadPool {
    private static String TAG = "LocateThreadPool ";
    private static final int WORK_THREAD_NUMBER = 1;
    private static volatile LocateSingleThreadPool instance = null;
    private ThreadPoolExecutor executorService;

    private ThreadFactory mFactory = new ThreadFactory() {
        @Override
        public Thread newThread(@NonNull Runnable r) {
            return new Thread(r, "locate-singleThreadPool-1");
        }
    };

    public static LocateSingleThreadPool getInstance() {
        if (instance == null) {
            synchronized (LocateSingleThreadPool.class) {
                if (instance == null) {
                    instance = new LocateSingleThreadPool();
                }
            }
        }
        return instance;
    }

    private LocateSingleThreadPool() {
        executorService = new ThreadPoolExecutor(WORK_THREAD_NUMBER
                , WORK_THREAD_NUMBER
                , 1
                , TimeUnit.MINUTES
                , new LinkedBlockingQueue<Runnable>(1000)
                , mFactory);
        executorService.allowCoreThreadTimeOut(true);
    }


    public void submit(Runnable r) {
        try {
            executorService.submit(r);
        } catch (Throwable t) {
        }
    }

    public void stop() {
        try {
            executorService.shutdown();
        } catch (Throwable t) {
        }
    }


}
