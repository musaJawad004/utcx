const { AndroidConfig, withAndroidManifest, withDangerousMod } = require('expo/config-plugins');
const fs = require('fs');
const path = require('path');

const COLORS = `<?xml version="1.0" encoding="utf-8"?>
<resources>
  <color name="utcx_canvas">#F2F0EA</color>
  <color name="utcx_ink">#10100F</color>
  <color name="utcx_graphite">#777670</color>
  <color name="utcx_ember">#FF6B1A</color>
  <string name="utcx_single_clock_display_name">UTCX City</string>
  <string name="utcx_single_clock_description">A precise single-city clock.</string>
  <string name="utcx_three_city_display_name">UTCX Three Cities</string>
  <string name="utcx_three_city_description">Three world clocks at a glance.</string>
  <string name="utcx_world_time_display_name">UTCX World Time</string>
  <string name="utcx_world_time_description">A large, resizable world-time instrument.</string>
</resources>`;

const singleLayout = `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android" android:id="@+id/utcx_root" android:layout_width="match_parent" android:layout_height="match_parent" android:background="@drawable/utcx_widget_background" android:gravity="center_vertical" android:orientation="vertical" android:padding="16dp">
  <LinearLayout android:layout_width="match_parent" android:layout_height="wrap_content" android:gravity="center_vertical" android:orientation="horizontal">
    <TextView android:id="@+id/utcx_city" android:layout_width="0dp" android:layout_height="wrap_content" android:layout_weight="1" android:fontFamily="sans-serif-medium" android:maxLines="1" android:text="Current" android:textColor="@color/utcx_ink" android:textSize="13sp" />
    <TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="monospace" android:text="●" android:textColor="@color/utcx_ember" android:textSize="9sp" />
  </LinearLayout>
  <Space android:layout_width="1dp" android:layout_height="0dp" android:layout_weight="1" />
  <TextClock android:id="@+id/utcx_time" android:layout_width="match_parent" android:layout_height="wrap_content" android:fontFamily="sans-serif-light" android:format12Hour="hh:mm a" android:format24Hour="HH:mm" android:includeFontPadding="false" android:textColor="@color/utcx_ink" android:textSize="34sp" />
  <TextView android:id="@+id/utcx_offset" android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="monospace" android:text="LOCAL TIME" android:textColor="@color/utcx_graphite" android:textSize="9sp" />
</LinearLayout>`;

const multiLayout = `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android" android:id="@+id/utcx_root" android:layout_width="match_parent" android:layout_height="match_parent" android:background="@drawable/utcx_widget_background" android:orientation="horizontal" android:padding="14dp">
  <LinearLayout android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:gravity="center_vertical" android:orientation="vertical"><TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="sans-serif-medium" android:text="LOS ANGELES" android:textColor="@color/utcx_graphite" android:textSize="9sp" /><TextClock android:id="@+id/utcx_time_one" android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="sans-serif-light" android:format12Hour="hh:mm" android:format24Hour="HH:mm" android:textColor="@color/utcx_ink" android:textSize="23sp" android:timeZone="America/Los_Angeles" /><TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="monospace" android:text="UTC−8" android:textColor="@color/utcx_ember" android:textSize="8sp" /></LinearLayout>
  <LinearLayout android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:gravity="center_vertical" android:orientation="vertical"><TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="sans-serif-medium" android:text="LONDON" android:textColor="@color/utcx_graphite" android:textSize="9sp" /><TextClock android:id="@+id/utcx_time_two" android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="sans-serif-light" android:format12Hour="hh:mm" android:format24Hour="HH:mm" android:textColor="@color/utcx_ink" android:textSize="23sp" android:timeZone="Europe/London" /><TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="monospace" android:text="UTC+0" android:textColor="@color/utcx_ember" android:textSize="8sp" /></LinearLayout>
  <LinearLayout android:layout_width="0dp" android:layout_height="match_parent" android:layout_weight="1" android:gravity="center_vertical" android:orientation="vertical"><TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="sans-serif-medium" android:text="TOKYO" android:textColor="@color/utcx_graphite" android:textSize="9sp" /><TextClock android:id="@+id/utcx_time_three" android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="sans-serif-light" android:format12Hour="hh:mm" android:format24Hour="HH:mm" android:textColor="@color/utcx_ink" android:textSize="23sp" android:timeZone="Asia/Tokyo" /><TextView android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="monospace" android:text="UTC+9" android:textColor="@color/utcx_ember" android:textSize="8sp" /></LinearLayout>
</LinearLayout>`;

const largeLayout = `<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android" android:id="@+id/utcx_root" android:layout_width="match_parent" android:layout_height="match_parent" android:background="@drawable/utcx_widget_background" android:orientation="vertical" android:padding="18dp">
  <LinearLayout android:layout_width="match_parent" android:layout_height="wrap_content" android:gravity="center_vertical" android:orientation="horizontal"><TextView android:layout_width="0dp" android:layout_height="wrap_content" android:layout_weight="1" android:fontFamily="sans-serif-medium" android:letterSpacing="0.18" android:text="UTCX" android:textColor="@color/utcx_ember" android:textSize="11sp" /><TextView android:id="@+id/utcx_offset" android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="monospace" android:text="LOCAL" android:textColor="@color/utcx_graphite" android:textSize="9sp" /></LinearLayout>
  <TextView android:id="@+id/utcx_city" android:layout_width="wrap_content" android:layout_height="wrap_content" android:layout_marginTop="20dp" android:fontFamily="sans-serif-medium" android:text="Current location" android:textColor="@color/utcx_ink" android:textSize="18sp" />
  <TextClock android:id="@+id/utcx_time" android:layout_width="match_parent" android:layout_height="wrap_content" android:fontFamily="sans-serif-light" android:format12Hour="hh:mm a" android:format24Hour="HH:mm" android:includeFontPadding="false" android:textColor="@color/utcx_ink" android:textSize="56sp" />
  <View android:layout_width="match_parent" android:layout_height="1dp" android:layout_marginBottom="10dp" android:layout_marginTop="10dp" android:background="#1F10100F" />
  <LinearLayout android:layout_width="match_parent" android:layout_height="0dp" android:layout_weight="1" android:gravity="center_vertical" android:orientation="horizontal"><TextView android:layout_width="0dp" android:layout_height="wrap_content" android:layout_weight="1" android:fontFamily="sans-serif" android:text="LOS ANGELES" android:textColor="@color/utcx_graphite" android:textSize="11sp" /><TextClock android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="monospace" android:format12Hour="hh:mm a" android:format24Hour="HH:mm" android:textColor="@color/utcx_ink" android:textSize="16sp" android:timeZone="America/Los_Angeles" /></LinearLayout>
  <LinearLayout android:layout_width="match_parent" android:layout_height="0dp" android:layout_weight="1" android:gravity="center_vertical" android:orientation="horizontal"><TextView android:layout_width="0dp" android:layout_height="wrap_content" android:layout_weight="1" android:fontFamily="sans-serif" android:text="LONDON" android:textColor="@color/utcx_graphite" android:textSize="11sp" /><TextClock android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="monospace" android:format12Hour="hh:mm a" android:format24Hour="HH:mm" android:textColor="@color/utcx_ink" android:textSize="16sp" android:timeZone="Europe/London" /></LinearLayout>
  <LinearLayout android:layout_width="match_parent" android:layout_height="0dp" android:layout_weight="1" android:gravity="center_vertical" android:orientation="horizontal"><TextView android:layout_width="0dp" android:layout_height="wrap_content" android:layout_weight="1" android:fontFamily="sans-serif" android:text="TOKYO" android:textColor="@color/utcx_graphite" android:textSize="11sp" /><TextClock android:layout_width="wrap_content" android:layout_height="wrap_content" android:fontFamily="monospace" android:format12Hour="hh:mm a" android:format24Hour="HH:mm" android:textColor="@color/utcx_ink" android:textSize="16sp" android:timeZone="Asia/Tokyo" /></LinearLayout>
</LinearLayout>`;

const background = `<?xml version="1.0" encoding="utf-8"?><shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="rectangle"><solid android:color="@color/utcx_canvas"/><corners android:radius="24dp"/><stroke android:width="1dp" android:color="#1F10100F"/><padding android:left="2dp" android:top="2dp" android:right="2dp" android:bottom="2dp"/></shape>`;

const provider = (className, layout, large = false) => `package com.musajawad.utcx

import android.app.PendingIntent
import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import java.util.TimeZone

class ${className} : AppWidgetProvider() {
  override fun onUpdate(context: Context, manager: AppWidgetManager, ids: IntArray) {
    ids.forEach { id ->
      val views = RemoteViews(context.packageName, R.layout.${layout})
      val zone = TimeZone.getDefault()
      ${large || className.includes('Single') ? 'views.setString(R.id.utcx_time, "setTimeZone", zone.id)\n      views.setTextViewText(R.id.utcx_city, zone.id.substringAfterLast("/").replace("_", " "))\n      views.setTextViewText(R.id.utcx_offset, "UTC" + String.format("%+.1f", zone.rawOffset / 3600000.0).replace(".0", ""))' : ''}
      val launch = context.packageManager.getLaunchIntentForPackage(context.packageName)
      if (launch != null) views.setOnClickPendingIntent(R.id.utcx_root, PendingIntent.getActivity(context, id, launch, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE))
      manager.updateAppWidget(id, views)
    }
  }
}`;

const info = (layout, minWidth, minHeight, targetWidth, targetHeight) => `<?xml version="1.0" encoding="utf-8"?><appwidget-provider xmlns:android="http://schemas.android.com/apk/res/android" android:minWidth="${minWidth}dp" android:minHeight="${minHeight}dp" android:targetCellWidth="${targetWidth}" android:targetCellHeight="${targetHeight}" android:updatePeriodMillis="1800000" android:initialLayout="@layout/${layout}" android:resizeMode="horizontal|vertical" android:widgetCategory="home_screen" />`;

module.exports = function withAndroidUTCXWidgets(config) {
  const receivers = [
    ['UTCXSingleClockProvider', 'utcx_single_clock_display_name', 'utcx_single_clock_info'],
    ['UTCXThreeCityProvider', 'utcx_three_city_display_name', 'utcx_three_city_info'],
    ['UTCXWorldTimeProvider', 'utcx_world_time_display_name', 'utcx_world_time_info'],
  ];
  let nextConfig = withAndroidManifest(config, (next) => {
    const app = AndroidConfig.Manifest.getMainApplicationOrThrow(next.modResults);
    const existing = app.receiver ?? [];
    app.receiver = [
      ...existing.filter((item) => !receivers.some(([name]) => item.$?.['android:name'] === `.${name}`)),
      ...receivers.map(([name, label, resource]) => ({
        $: { 'android:name': `.${name}`, 'android:exported': 'true', 'android:label': `@string/${label}` },
        'intent-filter': [{ action: [{ $: { 'android:name': 'android.appwidget.action.APPWIDGET_UPDATE' } }] }],
        'meta-data': [{ $: { 'android:name': 'android.appwidget.provider', 'android:resource': `@xml/${resource}` } }],
      })),
    ];
    return next;
  });
  nextConfig = withDangerousMod(nextConfig, ['android', async (next) => {
    const root = next.modRequest.platformProjectRoot;
    const res = path.join(root, 'app/src/main/res');
    const java = path.join(root, 'app/src/main/java/com/musajawad/utcx');
    for (const dir of [path.join(res, 'layout'), path.join(res, 'drawable'), path.join(res, 'values'), path.join(res, 'xml'), java]) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(res, 'values/utcx_colors.xml'), COLORS);
    fs.writeFileSync(path.join(res, 'drawable/utcx_widget_background.xml'), background);
    fs.writeFileSync(path.join(res, 'layout/utcx_widget_single.xml'), singleLayout);
    fs.writeFileSync(path.join(res, 'layout/utcx_widget_multi.xml'), multiLayout);
    fs.writeFileSync(path.join(res, 'layout/utcx_widget_large.xml'), largeLayout);
    fs.writeFileSync(path.join(res, 'xml/utcx_single_clock_info.xml'), info('utcx_widget_single', 110, 110, 2, 2));
    fs.writeFileSync(path.join(res, 'xml/utcx_three_city_info.xml'), info('utcx_widget_multi', 250, 110, 4, 2));
    fs.writeFileSync(path.join(res, 'xml/utcx_world_time_info.xml'), info('utcx_widget_large', 250, 220, 4, 4));
    fs.writeFileSync(path.join(java, 'UTCXSingleClockProvider.kt'), provider('UTCXSingleClockProvider', 'utcx_widget_single'));
    fs.writeFileSync(path.join(java, 'UTCXThreeCityProvider.kt'), provider('UTCXThreeCityProvider', 'utcx_widget_multi'));
    fs.writeFileSync(path.join(java, 'UTCXWorldTimeProvider.kt'), provider('UTCXWorldTimeProvider', 'utcx_widget_large', true));
    return next;
  }]);
  return nextConfig;
};
