import useAuth from "@/hooks/useAuth"

export default function Dashboard() {
    const { data } = useAuth()
    return <div>
        <h1>
            {data.data.id}
        </h1>
        <h2>
            {data.data.role}
        </h2>
    </div>
}