import React, { useContext, useEffect, useState } from 'react';
import { deleteFromDataBase, getFromDataBase } from '../../dataBaseManager';
import Data  from '../../data/data.json';
import Card from '../Card/Card';
import './CoursePurchase.css'
import {useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { userContext } from '../../App';
const CoursePurchase = () => {
    const [course, setCourse] = useState([]);
    const [count , setCount] = useState(0);
    const [logInUser] = useContext(userContext);
    const navigate = useNavigate()
    useEffect( () => {
        const courseKey = getFromDataBase();
        const courseObject = Object.keys(courseKey)
        const courseData = courseObject.map( key => {
            const course = Data.find(course => course.key === key);
            course.quantity = courseKey[key];
            return course;
        })
        courseData.length === 0 && navigate('/course')
        setCourse(courseData)
    },[navigate])
    const handleRemove = (data) => {
        if(data.key){
            deleteFromDataBase(data.key)
            const newCourse = course.filter(course => course.key !== data.key )
            setCourse(newCourse);
        }
    }
    
    return (
        <div className='course'>
            <div className='remove-area'>
                { course.map((data) => (
                        <div className='removeDetails' key={data.key}>
                            <h3>{data.name} <span id='nameTitle'>with the best teachers and trainers.</span></h3>
                            <div className='quantity' > 
                            <input onClick={() => setCount(count + 1)} className='increase' type="button" value="+" />
                            <input onClick={() => setCount( count -1)} className='decrease' type="button" value="-" />
                            <h4>Quantity: {data.quantity + count}</h4>
                            </div>
                            <h4>price: {data.price}</h4>
                            <Button
                            variant="danger" onClick={() => handleRemove(data)} ><small>Remove Course</small></Button>
                        </div>
                    ))
                }
            </div>
            <div className='enroll-area'>
                <Card cart ={course}>
                    {logInUser.email?
                    <Button className='getCourse' onClick={() => navigate('/shipment')} variant='success'>
                    <small>Get Course</small>
                    </Button> :
                    <Button className='getCourse' onClick={() => navigate('/login')} variant='success'>
                    <small>Get Course</small>
                    </Button>
                    }
                </Card>
                {course.length === 0 && navigate('/course')}
            </div>
        </div>
    );
};

export default CoursePurchase;