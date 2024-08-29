import ItemList from 'flarum/common/utils/ItemList';
import icon from 'flarum/common/helpers/icon';
import app from 'flarum/forum/app';
import Component from 'flarum/common/Component';
import avatar from 'flarum/common/helpers/avatar';
import username from 'flarum/common/helpers/username';
import PodiumUserCard from './PodiumUserCard';

export default class PodiumUserItem extends Component {
  view() {
    const user = this.attrs.user;
    const position = this.attrs.position;
    const params = this.attrs.params;

    let positionClass = '';
    let displayPosition = position;
    if (position === 1) {
      positionClass = 'second';
      displayPosition = 2;
    } else if (position === 2) {
      positionClass = 'first';
      displayPosition = 1;
    } else if (position === 3) {
      positionClass = 'third';
    }

    return (
      <div>
        <div className="PodiumUser-card">
          {PodiumUserCard.component({
            user,
            className: 'UserCard--directory UserCard--podium',
            controlsButtonClassName: 'Button Button--icon Button--flat',
            position,
            params
          })}
        </div>

        <span className={`PodiumUser-position ${positionClass}`}>{displayPosition}</span>
      </div>
    );
  }
}
