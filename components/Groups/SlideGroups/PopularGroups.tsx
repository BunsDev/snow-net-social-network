import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Slider from 'react-slick';
import GroupCard from './GroupCard';
import styles from './GroupsSlide.module.scss';

let settings = {
    dots: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2
};

export default function PopularGroups() {
    const [groups, setGroups] = useState<any>([])

    const fetchGroups = async ()=>{
        try{
            const groupsData = await axios.get('http://localhost:5000/api/groups');
            setGroups([...groupsData.data]);
            console.log(groupsData.data)
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchGroups();
    },[])

    return (
        <div className={styles.slideContainer}>
            <h3 className={styles.title}>Popular Groups</h3>
            <div className={styles.slide}>
                <Slider {...settings}>
                    {
                        groups.map(({title, description, groupPic, groupCover,
                                     private: groupPrivate, members}: any)=>(
                            <GroupCard 
                                title={title} 
                                description={description} 
                                groupPic={groupPic}
                                groupCover={groupCover}
                                groupPrivate={groupPrivate}
                                members={members}
                            />
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}
