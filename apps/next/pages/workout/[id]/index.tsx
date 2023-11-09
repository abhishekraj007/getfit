import WorkoutDetail from 'app/features/workout-detail';
import Head from 'next/head';

export default function Page() {
  return (
    <>
      <Head>
        <title>Workout details</title>
      </Head>
      <WorkoutDetail />
    </>
  );
}
