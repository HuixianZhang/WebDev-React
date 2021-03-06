import React, {useState, useEffect} from 'react'
import {Link, useParams} from "react-router-dom";
import moduleReducer from "../reducers/modules-reducer";
import lessonReducer from "../reducers/lesson-reducer";
import topicReducer from "../reducers/topic-reducer";
import widgetReducer from "../reducers/widgets-reducer";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ModuleList from "./module-list";
import LessonTabs from "./lesson-tabs";
import TopicTabs from "./topic-pills";
import WidgetList from "./widgets/widget-list";

import courseService, {deleteCourse, findCourseById} from "../services/course-service";



const reducer = combineReducers({
    moduleReducer: moduleReducer,
    lessonReducer: lessonReducer,
    topicReducer: topicReducer,
    widgetReducer: widgetReducer
})


const store = createStore(reducer)

const CourseEditor = ({history}) => {
    // console.log("props is:" + props)
    const {courseId, moduleId, layout} = useParams();
    const [courseTitle, setCourseTitle] = useState('');

    const getTitle = (courseId) => {
        findCourseById(courseId)  // Imported from my course-service
            .then(course => setCourseTitle(course.title));
    }
    useEffect(() => getTitle(courseId));
    //
    console.log('editor title is' + courseTitle)
    return (
        <Provider store={store}>
            <div>
                <h2>
                    <Link to={`/courses/${layout}`}>
                    {/*<Link to={'/courses/${props.match.params.layout}'}>*/}
                    {/*<Link to="/courses/table">*/}
                        <i className="fas fa-arrow-left"></i>
                    </Link>
                    {/*Course Editor {courseId} {moduleId}*/}
                    Course Editor : {courseTitle}
                    <i onClick={() => history.goBack()}
                       className="fas fa-times float-right"></i>
                </h2>
                <div className="row">
                    <div className="col-4">
                        <ModuleList/>
                    </div>
                    <div className="col-8">
                        <LessonTabs/>
                        {/*<h1>topic</h1>*/}
                        <TopicTabs/>
                        <WidgetList/>
                    </div>
                </div>

                {/*<div>*/}
                {/*    <TopicTabs/>*/}
                {/*</div>*/}
            </div>
        </Provider>)}

export default CourseEditor

