<?php

/*
 * This file is part of foskym/flarum-better-user-directory.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\BetterUserDirectory;

use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Settings())
        ->serializeToForum('foskym-better-user-directory.hide_search', 'foskym-better-user-directory.hide_search', 'boolval', false)
        ->serializeToForum('foskym-better-user-directory.hide_filter_groups', 'foskym-better-user-directory.hide_filter_groups', 'boolval', false)
        ->serializeToForum('foskym-better-user-directory.podium_style', 'foskym-better-user-directory.podium_style', 'boolval', false)
        ->serializeToForum('foskym-better-user-directory.show_all_items_in_top_cards', 'foskym-better-user-directory.show_all_items_in_top_cards', 'boolval', false)
        ->serializeToForum('foskym-better-user-directory.show_all_items_in_bottom_cards', 'foskym-better-user-directory.show_all_items_in_bottom_cards', 'boolval', false)
];
