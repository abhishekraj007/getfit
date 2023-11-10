import WorkoutExercises from 'app/screens/workout-exercises';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Exercise detail</title>
      </Head>
      <WorkoutExercises />
    </>
  );
}
