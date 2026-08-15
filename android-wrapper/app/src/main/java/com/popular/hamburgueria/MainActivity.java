package com.popular.hamburgueria;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.os.Bundle;
import android.webkit.CookieManager;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.content.Intent;
import android.net.Uri;

public class MainActivity extends Activity {
    private WebView web;
    private static final String APP_URL="https://popular-app-one.vercel.app/";
    @SuppressLint("SetJavaScriptEnabled")
    @Override public void onCreate(Bundle b){super.onCreate(b);web=new WebView(this);setContentView(web);WebSettings s=web.getSettings();s.setJavaScriptEnabled(true);s.setDomStorageEnabled(true);s.setDatabaseEnabled(true);s.setLoadsImagesAutomatically(true);s.setMediaPlaybackRequiresUserGesture(false);s.setUserAgentString(s.getUserAgentString()+" PopularAndroid/1.0");CookieManager.getInstance().setAcceptCookie(true);CookieManager.getInstance().setAcceptThirdPartyCookies(web,true);web.setWebChromeClient(new WebChromeClient());web.setWebViewClient(new WebViewClient(){@Override public boolean shouldOverrideUrlLoading(WebView v,String url){Uri u=Uri.parse(url);String scheme=u.getScheme();if("http".equals(scheme)||"https".equals(scheme)){if(u.getHost()!=null&&u.getHost().contains("popular-app-one.vercel.app"))return false;startActivity(new Intent(Intent.ACTION_VIEW,u));return true;}try{startActivity(new Intent(Intent.ACTION_VIEW,u));}catch(Exception ignored){}return true;}});web.loadUrl(APP_URL);}
    @Override public void onBackPressed(){if(web!=null&&web.canGoBack())web.goBack();else super.onBackPressed();}
}
