import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import mainImage1 from '../assets/images/mainImage.png'
import { Form, Button, Spinner } from 'react-bootstrap'
import { FormEvent, useState } from 'react'


export default function Home() {

  const [quote, setQuote] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get("prompt")?.toString().trim();

    if (prompt) {
      try {
        setQuote("");
        setQuoteLoadingError(false);
        setQuoteLoading(true);

        const response = await fetch("/api/cringe?prompt=" + encodeURIComponent(prompt));
        const body = await response.json();
        setQuote(body.quote);
      } catch (error) {
        console.error(error);
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    }
  }
  
  return (
    <>
      <Head>
        <title>Boo Chat App </title>
        <meta name="description" content="by Coding in Flow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Boo AI</h1>
        <h2>powered by GPT-3</h2>
        <div>Enter a topic and the Boo will generate a super cringy motivational quote</div>
        <div className={styles.mainImageContainer}>
          <Image
            src={mainImage1}
            fill
            alt='boo'
            priority
            className={styles.mainImage}
          />
        </div>
        <Form onSubmit={handleSubmit} className={styles.inputForm}>
          <Form.Group className='mb-3' controlId='prompt-input'>
            <Form.Label>Create a cringy quote about...</Form.Label>
            <br></br><br></br>
            <Form.Control
              name='prompt'
              placeholder='e.g. success, fear, potatoes'
              maxLength={100}
              className={`${styles.amazinginput} ${styles.amazinginput}`}
            />
          </Form.Group>
          <br></br>
          <Button type='submit' className={`${styles.amazingbutton} ${styles.amazingbutton}`}  disabled={quoteLoading}>
            Make me cringe
          </Button>
        </Form>
        <br></br>
        <div  className={`${styles.amazingtext} ${styles.amazingtext}`}>
        {quoteLoading && <Spinner animation='border' />}
        {quoteLoadingError && "Something went wrong. Please try again."}
        {quote && <h5>{quote}</h5>}
        </div>
      </main>
    </>
  )
}