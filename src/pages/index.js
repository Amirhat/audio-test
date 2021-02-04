import Head from 'next/head'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'

const DynamicComponentWithNoSSR = dynamic(() => import('../components/Dyna'), {
    ssr: false
})


export default function Home() {
    // Set up audio context
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    let currentBuffer = null;
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <DynamicComponentWithNoSSR />
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
