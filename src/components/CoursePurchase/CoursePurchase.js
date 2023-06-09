import React, { useEffect, useState } from 'react';
import { deleteFromDataBase, getFromDataBase } from '../../dataBaseManager';
import Data  from '../../data/data.json';
import Card from '../Card/Card';
import './CoursePurchase.css'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
const CoursePurchase = () => {
    const [course, setCourse] = useState([]);
    const [count , setCount] = useState(0)
    useEffect( () => {
        const courseKey = getFromDataBase();
        const courseObject = Object.keys(courseKey)
        const courseData = courseObject.map( key => {
            const course = Data.find(course => course.key === key);
            course.quantity = courseKey[key];
            return course;
        })
        setCourse(courseData)
    },[])
    const navigate = useNavigate()
    if(course.length === 0){
        navigate('/course' )
    }
    const handleRemove = (crsKey) => {
        if(crsKey){
            deleteFromDataBase(crsKey)
            const newCourse = course.filter(course => course.key !== crsKey )
            setCourse(newCourse);
        }

    }
    
   console.log(count)
    return (
        <div className='course'>
             
            <div className='remove-area'>
                {
                course.map((data) => (
                    <div className='removeDetails' key={data.key}>
                        <h3>{data.name} <span id='nameTitle'>with the best teachers and trainers.</span></h3>
                        <div className='quantity' >
                            
                            <input onClick={() => setCount(count + 1)} className='increase' type="button" value="+" />
                            <input onClick={() => setCount( count -1)} className='decrease' type="button" value="-" />
                            <h4>Quantity: {data.quantity + count}</h4>
                            
                        </div>
                        <h4>price: {data.price}</h4>
                        <Button
                        variant="danger" onClick={() => handleRemove(data.key)} ><small>Remove Course</small></Button>
                        

                    </div>
                ))
                    
                }
            </div>

            <div className='enroll-area'>
                <Card cart ={course}>
                    <Button className='getCourse' onClick={() => navigate('/login')} variant='success'>
                        <small>Get Course</small>
                    </Button>
                </Card>
                <br />
            </div>
            
        </div>
    );
};

export default CoursePurchase;