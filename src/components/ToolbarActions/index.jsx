import { useContext } from 'react';
import ClayManagementToolbar from '@clayui/management-toolbar';
import ClayIcon from '@clayui/icon';
import ClayButton from '@clayui/button';
import { ClayDropDownWithItems } from '@clayui/drop-down';
import NewRepository from '../NewRepository';
import { RepositoryContext } from '../../contexts/RepositoryContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import styles from './ToolbarActions.module.css';

function ToolbarActions() {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  const {
    repositoriesView,
    setRepositoriesView,
    filterFavoriteRepositories,
    filterOperationType,
    setFilterOperationType,
  } = useContext(RepositoryContext);

  const viewTypes = [
    {
      active: repositoriesView === 'cards',
      label: 'Cards',
      onClick: () => setRepositoriesView('cards'),
      symbolLeft: 'cards2',
    },
    {
      active: repositoriesView === 'list',
      label: 'List',
      onClick: () => setRepositoriesView('list'),
      symbolLeft: 'cards-full',
    },
  ];

  const viewTypeActive = viewTypes.find(type => type.active);

  return (
    <ClayManagementToolbar.ItemList>
      {/* show favorites button */}
      <ClayManagementToolbar.Item className={styles.favorites}>
        <ClayButton
          className="nav-link nav-link-monospaced"
          displayType="unstyled"
          onClick={() => {
            if (filterOperationType === 'favorites') {
              setFilterOperationType('');
            } else {
              setFilterOperationType('favorites');
              filterFavoriteRepositories();
            }
          }}
        >
          {filterOperationType === 'favorites' ? (
            <ClayIcon color={isDarkTheme ? '#FFF' : null} symbol="star" />
          ) : (
            <ClayIcon color={isDarkTheme ? '#FFF' : null} symbol="star-o" />
          )}
        </ClayButton>
      </ClayManagementToolbar.Item>

      {/* show dark theme button */}
      <ClayManagementToolbar.Item>
        <ClayButton
          className="nav-link nav-link-monospaced"
          displayType="unstyled"
          onClick={() => {
            setIsDarkTheme(!isDarkTheme);
          }}
        >
          <ClayIcon color={isDarkTheme ? '#FFF' : null} symbol="adjust" />
        </ClayButton>
      </ClayManagementToolbar.Item>

      {/* choose view button */}
      <ClayManagementToolbar.Item className={styles.displayType}>
        <ClayDropDownWithItems
          items={viewTypes}
          trigger={
            <ClayButton
              className="nav-link-monospaced nav-link"
              displayType="unstyled"
            >
              <ClayIcon
                color={isDarkTheme ? '#FFF' : null}
                symbol={viewTypeActive ? viewTypeActive.symbolLeft : ''}
              />
            </ClayButton>
          }
        />
      </ClayManagementToolbar.Item>

      {/* add new repository button */}
      <NewRepository />
    </ClayManagementToolbar.ItemList>
  );
}

export default ToolbarActions;
