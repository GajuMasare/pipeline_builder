import { PipelineToolbar } from './components/Toolbar/Toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './components/SubmitButton/SubmitButton';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appShell}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <img src={`${process.env.PUBLIC_URL}/vectorshiftLogo.png`} alt="VectorShift logo" className={styles.logo}/>
            <h1 className={styles.title}>Pipeline Builder</h1>
          </div>
        </div>
        <div className={styles.headerRight}>
          <SubmitButton />
        </div>
      </header>
      <div className={styles.main}>
        <aside className={styles.palette}>
          <PipelineToolbar />
        </aside>
        <main className={styles.canvasWrapper}>
          <PipelineUI />
        </main>
      </div>
    </div>
  );
}

export default App;
