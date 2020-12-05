package com.freshfoodmhi;

import android.app.Application;
import android.content.IntentFilter;

import io.rumors.reactnativesettings.RNSettingsPackage;
import io.rumors.reactnativesettings.receivers.GpsLocationReceiver;
import io.rumors.reactnativesettings.receivers.AirplaneModeReceiver;
import com.facebook.react.ReactApplication;
import com.clipsub.RNShake.RNShakeEventPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.ivanwu.googleapiavailabilitybridge.ReactNativeGooglePlayServicesPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.RNTextInputMask.RNTextInputMaskPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import org.wonday.pdf.RCTPdfView;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.reactnativecommunity.rnpermissions.RNPermissionsPackage;
import br.com.dopaminamob.gpsstate.GPSStatePackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import io.sentry.RNSentryPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.entria.views.RNViewOverflowPackage;
import com.horcrux.svg.SvgPackage;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.airbnb.android.react.maps.MapsPackage;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;

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
            new RNShakeEventPackage(),
            new VectorIconsPackage(),
            new ReactNativeGooglePlayServicesPackage(),
            new ReactNativeConfigPackage(),
            new RNTextInputMaskPackage(),
            new ImageResizerPackage(),
            new RCTPdfView(),
            new RNFetchBlobPackage(),
            new AsyncStoragePackage(),
            new RNPermissionsPackage(),
            new GPSStatePackage(),
            new RNGestureHandlerPackage(),
            new PickerPackage(),
            new RNSentryPackage(),
            new FastImageViewPackage(),
            new LinearGradientPackage(),
            new SplashScreenReactPackage(),
            new RNViewOverflowPackage(),
            new SvgPackage(),
            new ReactNativeOneSignalPackage(),
            new MapsPackage(),
            new RNDateTimePickerPackage(),
            new RNFusedLocationPackage(),
            new RNSettingsPackage()
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
    registerReceiver(new GpsLocationReceiver(), new IntentFilter("android.location.PROVIDERS_CHANGED"));
    registerReceiver(new AirplaneModeReceiver(), new IntentFilter("android.intent.action.AIRPLANE_MODE"));
  }
}
