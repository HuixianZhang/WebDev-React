import React from 'react'
import CourseTable from "./course-table";
import CourseGrid from "./course-grid";
import CourseEditor from "./course-editor";
import {Link, Route} from "react-router-dom";
import courseService, {findAllCourses, deleteCourse} from "../services/course-service";

class CourseManager extends React.Component {
  state = {
    inputTitle : 'New Course',
    courses: [],
    qwe: 123,
    sdf: 456
  }

  updateCourse = (course) => {
    console.log(course)
    courseService.updateCourse(course._id, course)
        .then(status => this.setState((prevState) => ({
          ...prevState,
          courses: prevState.courses.map(
              (c) => c._id === course._id ? course : c)

          // courses: prevState.courses.map(c => {
          //   if(c._id === course._id) {
          //     return course
          //   } else {
          //     return c
          //   }
          // })
        })))

  }

  componentDidMount = () =>
      // findAllCourses()
      //     .then(actualCourses => this.setState({
      //       courses: actualCourses
      //     }))
      findAllCourses()
          .then(courses => this.setState({courses}))

  addCourse = () => {
    const newCourse = {
      title: this.state.inputTitle,
      owner: "New Owner",
      lastModified: "Never"
    }
    courseService.createCourse(newCourse)
        .then(course => this.setState(
            (prevState) => ({
              ...prevState,
              courses: [
                ...prevState.courses,
                course
              ]
            })))
        .then(
            this.setState({
                inputTitle: "",
            })
        )
    // this.state.courses.push(newCourse)
    // this.setState(this.state)
  }

  deleteCourse = (courseToDelete) => {
    courseService.deleteCourse(courseToDelete._id)
        .then(status => {
          // const newCourses = this.state.courses
          //     .filter(course => course !== courseToDelete)
          // this.setState({
          //   courses: newCourses
          // })
          // this.setState((prevState) => {
          //   // let nextState = {...prevState}
          //   // nextState.courses =
          //   //     prevState
          //   //         .courses
          //   //         .filter(course => course !== courseToDelete)
          //
          //   let nextState = {
          //     ...prevState,
          //     courses: prevState.courses.filter
          //               (course => course !== courseToDelete)
          //   }
          //
          //   return nextState
          // })

          this.setState((prevState) => ({
            ...prevState,
            courses: prevState.courses.filter
            (course => course !== courseToDelete)
          }))
        })
  }

  render() {
    return(
        <div>
          <Link to="/">
            <i className="fas fa-2x fa-home float-right"></i>
          </Link>
          <h1>Course Manager</h1>

          {/*<button onClick={this.addCourse}>Add Course</button>*/}
            <div className="wbdv-sticky-nav-bar">
                <div className="row">
                    <div className="col-1">
                        <i className="fas fa-bars fa-2x"></i>
                    </div>
                    <div className="col-2 font-20 d-none d-lg-block">
                        Course Manager
                    </div>
                    <div className="col-8">
                        <input
                            onChange={ (e) =>
                                this.setState({
                                    inputTitle: e.target.value
                                })
                            }
                            value={this.state.inputTitle}
                            className="form-control" placeholder="New Course Title"/>

                    </div>
                    <div className="col-1">
                        <i onClick={this.addCourse} className="fas fa-plus-circle fa-2x color-me-red"></i>
                    </div>
                </div>
            </div>
            <div>
                <i onClick={async () => {
                    await this.addCourse

                }}
                   className="fas fa-plus-circle fa-4x color-me-red float-right my-controls-at-top-right"/>
            </div>
            {/*<i className="fas fa-plus-circle fa-4x color-me-red float-right"></i>*/}
          <Route path="/courses/table">
            <CourseTable
                updateCourse={this.updateCourse}
                deleteCourse={this.deleteCourse}
                courses={this.state.courses}/>
          </Route>
          <Route path="/courses/grid">
            <CourseGrid
                updateCourse={this.updateCourse}
                deleteCourse={this.deleteCourse}
                courses={this.state.courses}/>
          </Route>
          {/*<Route path="/courses/editor">*/}
          {/*    <CourseEditor/>*/}
          {/*</Route>*/}
          {/*<Route path="/courses/editor"*/}
          {/*       render={(props) => <CourseEditor props={props}/>}>*/}
          {/*</Route>*/}
          <Route path="/courses/editor"
                 render={(props) => <CourseEditor {...props}/>}>
          </Route>
        </div>
    )
  }
}

export default CourseManager
