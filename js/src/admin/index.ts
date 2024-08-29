import app from 'flarum/admin/app';

app.initializers.add('foskym/flarum-better-user-directory', () => {
  app.extensionData.for('foskym-better-user-directory')
    .registerSetting({
      setting: 'foskym-better-user-directory.hide_search',
      label: app.translator.trans('foskym-better-user-directory.admin.settings.hide_search'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'foskym-better-user-directory.hide_filter_groups',
      label: app.translator.trans('foskym-better-user-directory.admin.settings.hide_filter_groups'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'foskym-better-user-directory.podium_style',
      label: app.translator.trans('foskym-better-user-directory.admin.settings.podium_style'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'foskym-better-user-directory.show_all_items_in_top_cards',
      label: app.translator.trans('foskym-better-user-directory.admin.settings.show_all_items_in_top_cards'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'foskym-better-user-directory.show_all_items_in_bottom_cards',
      label: app.translator.trans('foskym-better-user-directory.admin.settings.show_all_items_in_bottom_cards'),
      type: 'boolean',
    });
});
