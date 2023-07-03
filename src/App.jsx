import 'bulma/css/bulma.css';
// import { classNames as cn } from 'classnames';

import './App.scss';
import { useState } from 'react';

const SORT_ALPHABETICALLY = 'alpabet sort';
const SORT_BY_LENGTH = 'length sort';
// const REVERSE = 'reverse';

function getChangedGoods(goods, sortType, isReversed) {
  const changedGoods = [...goods];

  if (sortType) {
    switch (sortType) {
      case (SORT_ALPHABETICALLY):
        changedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case (SORT_BY_LENGTH):
        changedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        return 0;
    }
  }

  if (isReversed) {
    changedGoods.reverse();
  }

  return changedGoods;
}

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getChangedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SORT_ALPHABETICALLY
              ? ''
              : 'is-light'
          }`}
          onClick={() => setSortType(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SORT_BY_LENGTH
              ? ''
              : 'is-light'
          }`}
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            isReversed
              ? ''
              : 'is-light'
          }`}
          onClick={() => {
            if (!isReversed) {
              setIsReversed(true);
            } else {
              setIsReversed(false);
            }
          }}
        >
          Reverse
        </button>

        { sortType !== '' || isReversed
          ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortType('');
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          )
          : null
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
