import { IBodyPart, IEquipment, IExercise, ILevel } from '@t4/ui/src/modals';

export const workoutsData =
  // 20231107204114
  // https://wicombit.com/demo/fitpro/json/data_workouts.php

  [
    {
      id: '5',
      title: 'The Ultimate Bruce Lee',
      description:
        "<p>When someone asks you to make a muscle, chances are you don’t flex your traps or rise onto your toes to show off your calves. You're going to roll up your sleeves and flex your biceps, inviting onlookers to your own personal “gun show.”</p>\r\n<p>And while those arm-focused articles can prove helpful, many seem to present the same basic information, which can only take your gains so far. In an effort to help you bust through your biceps-building plateaus, we've got a unique approach to promote new growth for those all-important show muscles. </p>",
      image: 'https://wicombit.com/demo/fitpro/images/workout_1519945908.jpg',
      duration: '4 Days/Week',
      goal: 'Strength',
      level: 'Advanced',
      bodypart: 'Abs',
      equipment: 'Stationary Bike',
      rate: 3,
      price: 'free',
    },
    {
      id: '4',
      title: 'Pumup biceps',
      description:
        "<p>When someone asks you to make a muscle, chances are you don’t flex your traps or rise onto your toes to show off your calves. You're going to roll up your sleeves and flex your biceps, inviting onlookers to your own personal “gun show.”</p>\r\n<p>And while those arm-focused articles can prove helpful, many seem to present the same basic information, which can only take your gains so far. In an effort to help you bust through your biceps-building plateaus, we've got a unique approach to promote new growth for those all-important show muscles. </p>",
      image: 'https://wicombit.com/demo/fitpro/images/workout_1519945561.jpg',
      duration: '3 Days/Week',
      goal: 'Transform',
      level: 'Advanced',
      bodypart: 'Abs',
      equipment: 'Medicine Ball',
      rate: 3,
      price: 'free',
    },
    {
      id: '3',
      title: 'Hardcore CrossFit Workouts',
      description:
        "<p>When someone asks you to make a muscle, chances are you don’t flex your traps or rise onto your toes to show off your calves. You're going to roll up your sleeves and flex your biceps, inviting onlookers to your own personal “gun show.”</p>\r\n<p>And while those arm-focused articles can prove helpful, many seem to present the same basic information, which can only take your gains so far. In an effort to help you bust through your biceps-building plateaus, we've got a unique approach to promote new growth for those all-important show muscles. </p>",
      image: 'https://wicombit.com/demo/fitpro/images/workout_1519945022.jpg',
      duration: '4 Days/Week',
      goal: 'Transform',
      level: 'Intermediate',
      bodypart: 'Forearms',
      equipment: 'Medicine Ball',
      rate: 2,
      price: 'free',
    },
    {
      id: '2',
      title: 'Abs Intermediate',
      description:
        "<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>\r\n<p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>\r\n<p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>",
      image: 'https://wicombit.com/demo/fitpro/images/workout_1519945666.jpg',
      duration: '4 Days/Week',
      goal: 'Strength',
      level: 'Intermediate',
      bodypart: 'Forearms',
      equipment: 'Pull Up Bar',
      rate: 2,
      price: 'free',
    },
    {
      id: '1',
      title: 'Abs Beginner',
      description:
        "<p>When someone asks you to make a muscle, chances are you don’t flex your traps or rise onto your toes to show off your calves. You're going to roll up your sleeves and flex your biceps, inviting onlookers to your own personal “gun show.”</p>\r\n<p>And while those arm-focused articles can prove helpful, many seem to present the same basic information, which can only take your gains so far. In an effort to help you bust through your biceps-building plateaus, we've got a unique approach to promote new growth for those all-important show muscles. </p>",
      image: 'https://wicombit.com/demo/fitpro/images/workout_1519944619.jpg',
      duration: '3 Days/Week',
      goal: 'Strength',
      level: 'Intermediate',
      bodypart: 'Forearms',
      equipment: 'No Equipment',
      rate: 2,
      price: 'free',
    },
  ];

export const exercisesData: IExercise[] = [
  {
    id: 'ia66LvCyG1WvPTUjekN7',
    video:
      'https://ak.picdn.net/shutterstock/videos/1402807/preview/stock-footage-handsome-muscular-man-exercising-on-isolated-white-background.mp4',
    image: 'https://i.pinimg.com/originals/f7/7d/a9/f77da9406a3a76c70a1d3afab2bada0e.gif',
    rest: {
      time: 30,
      unit: 'sec',
    },
    title: 'Barbell High Pull',
    equipment: '1hG6tVitS1qWjqXCkpYE',
    body_parts: ['IkJ3m8CQ3psB2roVCh7p', 'RDZPOIFK3y5EImIvnyvK'],
    reps: 5,
    sets: 4,
    tips: '* There are plenty of ways to incorporate arms and abs into the same workout, building the superhero body you want.\n* This one is the most direct: You’ll superset an arm exercise (or two) with an ab movement.\n* Your goal: Carry the momentum and focus from the ab movement into your next set of the arm movement',
    instructions:
      '* Use an ab wheel, or a barbell with 10-pound plates. Grasp the end of the barbell with both hands, knees on the ground, abs tight.\n',
  },
  {
    id: 'txl4fTQTmLKEPpaudsJK',
    video:
      'https://ak.picdn.net/shutterstock/videos/1402807/preview/stock-footage-handsome-muscular-man-exercising-on-isolated-white-background.mp4',
    image: 'https://i.pinimg.com/originals/f7/7d/a9/f77da9406a3a76c70a1d3afab2bada0e.gif',
    rest: {
      time: 15,
      unit: 'sec',
    },
    title: 'Reclining Triceps Press',
    equipment: 'g2FAMLwllUf1J9hXfzXg',
    body_parts: ['Ry6B02NqBcYAp1xLJd29', 'WCwvYdTvgseRs67FwtKj', 'jVs34WHys2z5y1yACa8w'],
    reps: 5,
    sets: 4,
    tips: 'There are plenty of ways to incorporate arms and abs into the same workout, building the superhero body you want.This one is the most direct: You’ll superset an arm exercise (or two) with an ab movement.Your goal: Carry the momentum and focus from the ab movement into your next set of the arm movement.',
    instructions:
      '1. Use an ab wheel, or a barbell with 10-pound plates. Grasp the end of the barbell with both hands, knees on the ground, abs tight.\n2. Roll the bar forward, keeping your abs tight and extending your arms forward while squeezing your shoulder blades; squeeze your glutes as you near full extension.\n3. Draw your abs in, rolling the bar back to your knees. That’s 1 rep; do 10.',
  },
  {
    id: 'txl4fTQTmLKEPpaudsJKkk',
    video:
      'https://ak.picdn.net/shutterstock/videos/1402807/preview/stock-footage-handsome-muscular-man-exercising-on-isolated-white-background.mp4',
    image: 'https://i.pinimg.com/originals/f7/7d/a9/f77da9406a3a76c70a1d3afab2bada0e.gif',
    rest: {
      time: 10,
      unit: 'sec',
    },
    title: 'Triceps Press',
    equipment: 'g2FAMLwllUf1J9hXfzXg',
    body_parts: ['Ry6B02NqBcYAp1xLJd29', 'WCwvYdTvgseRs67FwtKj', 'jVs34WHys2z5y1yACa8w'],
    reps: 5,
    sets: 4,
    tips: 'There are plenty of ways to incorporate arms and abs into the same workout, building the superhero body you want.This one is the most direct: You’ll superset an arm exercise (or two) with an ab movement.Your goal: Carry the momentum and focus from the ab movement into your next set of the arm movement.',
    instructions:
      '1. Use an ab wheel, or a barbell with 10-pound plates. Grasp the end of the barbell with both hands, knees on the ground, abs tight.\n2. Roll the bar forward, keeping your abs tight and extending your arms forward while squeezing your shoulder blades; squeeze your glutes as you near full extension.\n3. Draw your abs in, rolling the bar back to your knees. That’s 1 rep; do 10.',
  },
  {
    id: 'txl4fTQTmLKEPpaudsJKmm',
    video:
      'https://ak.picdn.net/shutterstock/videos/1402807/preview/stock-footage-handsome-muscular-man-exercising-on-isolated-white-background.mp4',
    image: 'https://i.pinimg.com/originals/f7/7d/a9/f77da9406a3a76c70a1d3afab2bada0e.gif',
    rest: {
      time: 1,
      unit: 'min',
    },
    title: 'Dummuy Triceps Press',
    equipment: 'g2FAMLwllUf1J9hXfzXg',
    body_parts: ['Ry6B02NqBcYAp1xLJd29', 'WCwvYdTvgseRs67FwtKj', 'jVs34WHys2z5y1yACa8w'],
    reps: 5,
    sets: 4,
    tips: 'There are plenty of ways to incorporate arms and abs into the same workout, building the superhero body you want.This one is the most direct: You’ll superset an arm exercise (or two) with an ab movement.Your goal: Carry the momentum and focus from the ab movement into your next set of the arm movement.',
    instructions:
      '1. Use an ab wheel, or a barbell with 10-pound plates. Grasp the end of the barbell with both hands, knees on the ground, abs tight.\n2. Roll the bar forward, keeping your abs tight and extending your arms forward while squeezing your shoulder blades; squeeze your glutes as you near full extension.\n3. Draw your abs in, rolling the bar back to your knees. That’s 1 rep; do 10.',
  },
];

export const bodyPartsData: IBodyPart[] = [
  {
    id: 'IkJ3m8CQ3psB2roVCh7p',
    image: 'https://wicombit.com/demo/fitpro/images/bodypart_1517098193.jpg',
    name: 'Legs',
  },
  {
    id: 'RDZPOIFK3y5EImIvnyvK',
    image: 'https://wicombit.com/demo/fitpro/images/bodypart_1519938334.jpg',
    name: 'Back',
  },
  {
    id: 'Ry6B02NqBcYAp1xLJd29',
    image: 'https://wicombit.com/demo/fitpro/images/bodypart_1517098045.jpg',
    name: 'Abs',
  },
  {
    id: 'USbv79Zs0Aemc0ZCxUHU',
    image: 'https://wicombit.com/demo/fitpro/images/bodypart_1517097822.png',
    name: 'Chest',
  },
  {
    id: 'WCwvYdTvgseRs67FwtKj',
    image: 'https://wicombit.com/demo/fitpro/images/bodypart_1517097991.jpg',
    name: 'Triceps',
  },
  {
    id: 'a9bhXKwkag8e0nItJHFP',
    image: 'https://wicombit.com/demo/fitpro/images/bodypart_1517097903.jpg',
    name: 'Forearms',
  },
  {
    id: 'aHND95A3hEvuV5tWUGYb',
    image: 'https://wicombit.com/demo/fitpro/images/bodypart_1517098401.jpg',
    name: 'Biceps',
  },
  {
    id: 'jVs34WHys2z5y1yACa8w',
    image: 'https://wicombit.com/demo/fitpro/images/bodypart_1517098824.jpg',
    name: 'Shoulders',
  },
];

export const levelsData: ILevel[] = [
  {
    id: '0RBLnA9XHIf4fyaOO2Xg',
    image: 'https://wicombit.com/demo/fitpro/images/level_1516827206.jpg',
    name: 'Beginner',
    rate: 1,
  },
  {
    id: 'a5scTLseDOC8Yzwde8M9',
    image: 'https://wicombit.com/demo/fitpro/images/level_1516827226.jpg',
    name: 'Advanced',
    rate: 3,
  },
  {
    id: 'hImU4PLxxKLLmdIaTIlR',
    image: 'https://wicombit.com/demo/fitpro/images/level_1517336508.jpg',
    name: 'Elite',
    rate: 4,
  },
  {
    id: 'q7Ayr8R0ziV8ZG7LODkU',
    image: 'https://wicombit.com/demo/fitpro/images/level_1516827220.jpg',
    name: 'Intermediate',
    rate: 2,
  },
];

export const equipmentsData: IEquipment[] = [
  {
    id: '1hG6tVitS1qWjqXCkpYE',
    image: 'https://wicombit.com/demo/fitpro/images/equipment_1572739504.png',
    name: 'Barbell',
  },
  {
    id: '1xYmdFLrF5vPFvsdFEq1',
    image: 'https://wicombit.com/demo/fitpro/images/equipment_1572742716.png',
    name: 'Jumping Rope',
  },
  {
    id: '9bZJ5jrE3gPOCavIY4Z0',
    image: 'https://wicombit.com/demo/fitpro/images/equipment_1572740201.png',
    name: 'Medicine Ball',
  },
  {
    id: 'CHd4KRF7rU2FRJ6X1IMV',
    image: 'https://wicombit.com/demo/fitpro/images/equipment_1572739480.png',
    name: 'Dumbbells',
  },
  {
    id: 'fax9Gi4vxC4jotcnjrwF',
    image: 'https://wicombit.com/demo/fitpro/images/equipment_1572739262.png',
    name: 'Stationary Bike',
  },
  {
    id: 'g2FAMLwllUf1J9hXfzXg',
    image: 'https://wicombit.com/demo/fitpro/images/equipment_1572739444.png',
    name: 'No Equipment',
  },
  {
    id: 'llbcTKuAUSXZy7ZBgexe',
    image: 'https://wicombit.com/demo/fitpro/images/equipment_1572740143.png',
    name: 'Pull Up Bar',
  },
  {
    id: 'nrc2SI1ir89JJTYxBbQy',
    image: 'https://wicombit.com/demo/fitpro/images/equipment_1572739428.png',
    name: 'Kettlebells',
  },
];
