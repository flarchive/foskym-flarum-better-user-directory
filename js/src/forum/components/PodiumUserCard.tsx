import app from 'flarum/common/app';
import UserCard from 'flarum/forum/components/UserCard';
import ItemList from 'flarum/common/utils/ItemList';
import humanTime from 'flarum/common/utils/humanTime';
import Component from 'flarum/common/Component';
import icon from 'flarum/common/helpers/icon';
import { sortItem } from '../utils/sortItem';

export default class PodiumUserCard extends UserCard {
  //Overriding infoItems so that other extensions can separately add items to small cards
  infoItems() {
    const items = new ItemList();
    const user = this.attrs.user;
    const params = this.attrs.params;
    const sort = params.sort || '';

    const superItems = super.infoItems();
    superItems.add(
      'discussion-count',
      <div className="userStat">
        {icon('fas fa-comment')}
        {app.translator.trans('fof-user-directory.forum.page.usercard.discussion-count', {
          count: user.discussionCount(),
        })}
      </div>,
      70
    );

    superItems.add(
      'comment-count',
      <div className="userStat">
        {icon('fas fa-comments')}
        {app.translator.trans('fof-user-directory.forum.page.usercard.post-count', {
          count: user.commentCount(),
        })}
      </div>,
      69
    );

    const showAll = app.forum.attribute('foskym-better-user-directory.show_all_items_in_top_cards');
    if (showAll) {
      return superItems;
    }

    for (const key in sortItem) {
      if (sortItem[key].includes(sort)) {
        if (superItems.has(key)) {
          items.add(key, superItems.get(key));
        }
      }
    }

    return items;
  }
}
