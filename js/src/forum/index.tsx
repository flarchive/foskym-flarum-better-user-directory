import app from 'flarum/forum/app';
import { override, extend } from 'flarum/common/extend';
import Component from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import Placeholder from 'flarum/common/components/Placeholder';
import PodiumUserItem from './components/PodiumUserItem';
import OrderUserCard from './components/OrderUserCard';

app.initializers.add('foskym/flarum-better-user-directory', () => {
  if ('fof-user-directory' in flarum.extensions) {
    const UserDirectoryPage = flarum.extensions['fof-user-directory']?.UserDirectoryPage as any;
    extend(UserDirectoryPage.prototype, 'viewItems', function (items) {
      if (app.forum.attribute('foskym-better-user-directory.hide_search')) {
        items.remove('search');
      }
      if (app.forum.attribute('foskym-better-user-directory.hide_filter_groups')) {
        items.remove('filterGroups');
      }
    });

    const components = flarum.extensions['fof-user-directory']?.components as any;

    const UserDirectoryUserCard = components?.UserDirectoryUserCard as any;
    const SmallUserCard = components?.SmallUserCard as any;

    const UserDirectoryListItem = flarum.extensions['fof-user-directory']?.UserDirectoryListItem as any;
    override(UserDirectoryListItem.prototype, 'view', function (original) {
      const { user, useSmallCards, isPodium, position, params } = this.attrs;

      const attributes = {
        user,
        className: `UserCard--directory${useSmallCards ? ' UserCard--small' : ''}`,
        controlsButtonClassName: 'Button Button--icon Button--flat',
        position,
        params,
      };

      const podiumStyle = app.forum.attribute('foskym-better-user-directory.podium_style');

      if (podiumStyle) {
        if (isPodium) {
          return <div className="User">{PodiumUserItem.component(attributes)}</div>;
        }

        return <div className="User">{OrderUserCard.component(attributes)}</div>;
      }

      return <div className="User">{useSmallCards ? SmallUserCard.component(attributes) : UserDirectoryUserCard.component(attributes)}</div>;
    });

    const UserDirectoryList = flarum.extensions['fof-user-directory']?.UserDirectoryList as any;
    override(UserDirectoryList.prototype, 'view', function (original) {
      const { state } = this.attrs;

      const params = state.getParams();
      const useSmallCards = app.forum.attribute('userDirectorySmallCards');
      let loading;

      if (state.isLoading()) {
        loading = LoadingIndicator.component();
      } else if (state.moreResults) {
        loading = Button.component(
          {
            className: 'Button',
            onclick: state.loadMore.bind(state),
          },
          app.translator.trans('fof-user-directory.forum.page.load_more_button')
        );
      }

      if (state.empty()) {
        const text = app.translator.trans('fof-user-directory.forum.page.empty_text');
        return <div className="DiscussionList">{Placeholder.component({ text })}</div>;
      }

      const podiumStyle = app.forum.attribute('foskym-better-user-directory.podium_style');

      let podiumUsers = state.users.slice(0, 3);
      let remainingUsers = podiumStyle ? state.users.slice(3) : state.users;
      if (podiumUsers.length >= 2) {
        [podiumUsers[0], podiumUsers[1]] = [podiumUsers[1], podiumUsers[0]];
      }

      return (
        <div
          className={
            'UserDirectoryList' +
            (state.isSearchResults() ? ' UserDirectoryList--searchResults' : '') +
            (useSmallCards ? ' UserDirectoryList--small-cards' : '')
          }
        >
          {podiumStyle && (
            <ul className="UserDirectoryList-Podium-users">
              {podiumUsers.map((user: any, index: number) => {
                return (
                  <li key={user.id()} data-id={user.id()}>
                    {UserDirectoryListItem.component({ user, params, useSmallCards, isPodium: true, position: index + 1 })}
                  </li>
                );
              })}
            </ul>
          )}
          <ul className="UserDirectoryList-users">
            {remainingUsers.map((user: any, index: number) => {
              return (
                <li key={user.id()} data-id={user.id()}>
                  {UserDirectoryListItem.component({ user, params, useSmallCards, isPodium: false, position: index + 4 })}
                </li>
              );
            })}
          </ul>
          <div className="UserDirectoryList-loadMore">{loading}</div>
        </div>
      );
    });
  }
});
