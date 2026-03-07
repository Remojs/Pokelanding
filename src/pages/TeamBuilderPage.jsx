import React from 'react';
import { Link } from 'react-router-dom';
import GameBoyHeader from '../shared/components/GameBoyHeader';
import TeamBuilder from '../features/teambuilder/TeamBuilder';
import styles from './TeamBuilderPage.module.css';
import indexStyles from './Index.module.css';

const TeamBuilderPage = () => {
  return (
    <div className={indexStyles.container}>
      <div className={indexStyles.backgroundPattern} />
      <div className={indexStyles.layout}>
        <GameBoyHeader />
        <main className={styles.main}>
          <div className={styles.breadcrumb}>
            <Link to="/" className={styles.backLink}>← POKÉDEX</Link>
            <span className={styles.sep}>/</span>
            <span className={styles.current}>TEAM BUILDER</span>
          </div>
          <TeamBuilder />
        </main>
      </div>
    </div>
  );
};

export default TeamBuilderPage;
