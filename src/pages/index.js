import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'



export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <Link href={"./test1"}>
              <a> test 1</a>
          </Link>
      </main>
      <main className={styles.main}>
          <Link href={"./test2"}>
              <a> test 2</a>
          </Link>
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
  )
}
