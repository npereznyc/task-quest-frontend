import { useState, useEffect, useContext } from "react"
import { useParams } from 'react-router'
import { useNavigate, Link } from "react-router-dom"
import { UserContext } from "../../data"

export default function ChildList(props) {
    // useContext data
    const { currentUserID } = useContext(UserContext)
    const { setAuth, setUser, setUserID } = useContext(UserContext)

    // useState variables
    const [caregiver, setCaregiver] = useState(undefined)
    const [children, setChildren] = useState([])
    const [tasks, setTasks] = useState([])
    const [rewards, setRewards] = useState([])

    // useParams - useEffect dependency
    const { id } = useParams()

    const navigate = useNavigate()

    async function getChildren() {
        let child
        try {
            const response = await fetch(`http://localhost:4000/caregiver/6410a52aab95a2c2f235bb16/children`)
            child = await response.json()
        } catch (err) {
            console.error(err.message)
        } finally {
            // console.log(`> getProfile() found`, result.username + `!`)
            setChildren(child)
        }
    }

    async function getTasks() {
        let task
        try {
            const response = await fetch(`http://localhost:4000/task/${id}`)
            task= await response.json()
        } catch(err) {
            console.error(err.message)
        } finally {
            setTasks(tasks)
        }
    }
    
    console.log('children: ', children)
    console.log('tasks: ', tasks)
  
    useEffect(() => {
        getChildren()
        getTasks()
        // getChildren(id)
    }, [id])


    function loaded() {
        // console.log(`Loaded`, profile.username, `and`, posts.length, `posts!`)

        function findChildrenByCaregiver(caregiver) {
            let allChildren = []
            for (let i = 0; i < children.length; i++) {
                    allChildren.push(children[i])
                
                // if (caregiver === children[i].caregiverId) {
                //     allChildren.push(children[i])
                // }
                
            }
            console.log(allChildren)
            return allChildren
        }

        const allChildren = findChildrenByCaregiver()

        // const allChildren = findChildrenByCaregiver(caregiver._id)
        // const isCaregiver = currentUserID === caregiver._id

        return (
            // <div className="children-list-container">
            //     {allChildren.length ? <>
            //         {caregiver.caregiverName ? <><p>Children Associated With {caregiver.caregiverName}:</p>
            //             <br /></> : null}
            //         <div className="children-list">{allChildren.map((child) => (
            //             <Link to={`/child/${child._id}`} key={child._id}>
            //                 <div className="child">
            //                     {child.caregiverId ? <p>{child.childName}</p> : null}
            //                     {child.taskArray ? <p className="child-tasks">{child.taskArray}</p> : null}
            //                     {child.rewardsArray ? <p className="child-tasks">{child.rewardsArray}</p> : null}
            //                 </div>
            //             </Link>
            //         ))}</div>
            //     </> : <p className="details">There are no children associated with this caregiver</p>}
            // </div>

            <div className="children-list-container">
                {allChildren.length ? <>
                    <div className="children-list">{allChildren.map((child) => (
                    
                            <div className="child" key={child._id}>
                                {child.caregiverId ? <p>{child.childName}</p> : null}
                                {}


                                {child.taskArray ? <p className="child-tasks">{child.taskArray}</p> : null}
                                {child.rewardsArray ? <p className="child-tasks">{child.rewardsArray}</p> : null}
                            </div>
                      
                    ))}</div>
                </> : <p className="details">There are no children associated with this caregiver</p>}
            </div>

        )
    }

    function loading() {
        return (
            <h1>
                Loading...&nbsp;
                <img
                    width="200px"
                    className="spinner"
                    src="https://freesvg.org/img/1544764567.png"
                    alt="Loading animation"
                />
            </h1>
        )
    }

    return (
        <section className="Children">
            {
                // children.length &&
                // id === caregiver._id ?
                loaded()
                // : loading()
            }
        </section>
    )
}