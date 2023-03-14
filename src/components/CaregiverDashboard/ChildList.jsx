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

    // useParams - useEffect dependency
    const { id } = useParams()

    const navigate = useNavigate()

    async function getCaregiver(caregiver) {
        // console.log(`> getProfile() ending -` + userProfile.substring(16, userProfile.length) + `...`)
        let result
        try {
            const response = await fetch(`http://localhost:4000/caregiverdashboard/${caregiver}`)
            result = await response.json()
        } catch (err) {
            console.error(err.message)
        } finally {
            // console.log(`> getProfile() found`, result.username + `!`)
            setCaregiver(result)
        }
    }

    useEffect(() => {
        // console.log(`* useEffect() invoked...`)
        getCaregiver(id)

        return (() => {
            // console.log(`* Profile and Posts wiped out!`)
            setChildren([])
            setCaregiver(undefined)
        })
    }, [id])


    function loaded() {
        // console.log(`Loaded`, profile.username, `and`, posts.length, `posts!`)

        function findChildrenByCaregiver(caregiver) {
            let allChildren = []
            for (let i = 0; i < children.length; i++) {
                if (caregiver === children[i].caregiver) {
                    allChildren.push(children[i])
                }
            }
            // console.log(`Found`, userPosts.length, `posts from`, profile.username)
            return allChildren
        }

        const allChildren = findChildrenByCaregiver(caregiver._id)
        const isCaregiver = currentUserID === caregiver._id

        return (
            <div className="children-list-container">
                {allChildren.length ? <>
                    {caregiver.caregiverName ? <><p>Children Associated With {caregiver.caregiverName}:</p>
                        <br /></> : null}
                    <div className="children-list">{allChildren.map((child) => (
                        <Link to={`/child/${child._id}`} key={child._id}>
                            <div className="child">
                                {child.caregiverId ? <p>{child.childName}</p> : null}
                                {child.taskArray ? <p className="child-tasks">{child.taskArray}</p> : null}
                                {child.rewardsArray ? <p className="child-tasks">{child.rewardsArray}</p> : null}
                            </div>
                        </Link>
                    ))}</div>
                </> : <p className="details">There are no children associated with this caregiver</p>}
            </div>
        )
    }

    function loading() {
        // console.log(`Loading... User?`, profile?.username || Boolean(profile), `Posts:`, posts?.length)
        return (
            <h1>
                Loading...&nbsp;
                <img
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
                children.length &&
                id === caregiver._id ?
                loaded() : loading()
            }
        </section>
    )
}