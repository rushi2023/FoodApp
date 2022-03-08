import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect,useState } from 'react';




const AvailableMeals = () => {
const [meals,setMeals] = useState([]);
const [isLoding,setIsLoding] = useState(true);
const[httpError,setHttpError] = useState();
  useEffect(()=>{
    const fatchMeals= async ()=>{
    const response = await fetch('https://react-82195-default-rtdb.firebaseio.com/meals.json');
if(!response.ok){
  throw new Error('Faild to Fatch!');
}

    const responseData = await response.json();

    const loadeMeals = [];
    for(const key in responseData){
      loadeMeals.push({
        id:key,
        name:responseData[key].name,
        description:responseData[key].description,
        price:responseData[key].price,
      })
    }
    setMeals(loadeMeals);
    setIsLoding(false)
    }
    
    fatchMeals().catch(error => {
      setIsLoding(false);
      setHttpError(error.message);
    });
    },[])

if(isLoding){
  return(<section className={classes.MealsLoading}>
    <p>Loding...</p>
  </section>
  )
}

if(httpError){
  return(<section className={classes.MealError}>
    <p>{httpError}</p>
  </section>)
}
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
