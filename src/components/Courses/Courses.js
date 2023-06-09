import React, { useEffect, useState } from 'react';
import Data from '../../data/data.json'
import Production from '../Production/Production';
import './Courses.css';
import Card from '../Card/Card';
import Header from '../Header/Header';
import { addToDataBase, getFromDataBase } from '../../dataBaseManager';
import { Link } from 'react-router-dom';


const Courses = () => {
    const [cart, setCart] = useState([]);
    const handleClick = (course) => {
        const sameCourse = cart.find( crs => crs.key === course.key )
        let count = 1;
        let newCart;
        if(sameCourse){
            count = sameCourse.quantity + 1;
            sameCourse.quantity = count;
            const others = cart.filter(crs => crs.key !== course.key);
            newCart = [...others, sameCourse]
        }
        else{
            course.quantity = 1;
            newCart = [...cart, course]
        }
        setCart(newCart);
        addToDataBase(course.key, count)
    }

    useEffect(() => {
        const getKey = getFromDataBase();
        const getObject = Object.keys(getKey);
        const courseData = getObject.map(key => {
            const course = Data.find(crs => crs.key === key)
            course.quantity = getKey[key]
            return course;
        })
        setCart(courseData)
    },[])
    return (
        <div>
            <div className='course'>
                <div className='course-area'>
                    {
                        Data.map((data, i) => (
                            <div key={i}>
                                <Production course ={data} handleClick ={handleClick}></Production>
                            </div>
                        ))
                        
                    }
                </div>

                <div className='enroll-area'>
                    <Card cart ={cart} >
                        <Link to = '/purchase'>
                            <button className='purchaseBtn'>Get Purchase</button>
                        </Link>
                        { cart.length === 0 && <h6>Please select a course !!</h6>}
                    </Card>
                    <br />
                </div>
            </div>
        </div>
        
    );
};

export default Courses;