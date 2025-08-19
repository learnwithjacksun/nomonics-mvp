import { Box, Search } from "@/components/ui";
import { useAdmin } from "@/hooks";
import { MainLayout } from "@/layouts";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const roleFilterBtns = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Reader",
        value: "reader",
    },
    {
        label: "Creator",
        value: "creator",
    },
]

export default function Users() {
    const {users} = useAdmin()
    const [search, setSearch] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");

    // Filter and search logic
    const filteredUsers = useMemo(() => {
        if (!users) return [];
        
        return users.filter((user) => {
            // Search filter
            const searchMatch = search === "" || 
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase());
            
            // Role filter
            const roleMatch = selectedRole === "all" || user.role === selectedRole;
            
            return searchMatch && roleMatch;
        });
    }, [users, search, selectedRole]);

    return (
        <MainLayout title="Users" description="Manage your users">
            <div className="space-y-4">
                <div className="md:w-[70%] w-full">
                    <Search
                        search={search}
                        setSearch={setSearch}
                        placeholder="Search by user name or email..."
                    />
                </div>

                <ul className="flex items-center gap-2 flex-wrap">
                    {roleFilterBtns.map((role) => (
                        <li
                            key={role.value}
                            onClick={() => setSelectedRole(role.value)}
                            className={`capitalize text-sm ${
                                selectedRole === role.value
                                    ? "bg-primary-2 font-medium text-white border border-transparent"
                                    : "bg-background text-muted border border-line"
                            } rounded-full px-4 py-2 cursor-pointer shadow-lg`}
                        >
                            {role.label}
                        </li>
                    ))}
                </ul>

                {/* Results count */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-muted">
                        Showing {filteredUsers.length} of {users?.length || 0} users
                    </p>
                    {(search || selectedRole !== "all") && (
                        <button
                            onClick={() => {
                                setSearch("");
                                setSelectedRole("all");
                            }}
                            className="text-sm text-primary-2 hover:underline"
                        >
                            Clear filters
                        </button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <Box key={user.id}>
                            <Link to={`/users/${user.id}`} className="flex items-center gap-4">
                                <div className="h-20 min-w-20 bg-blue-300 rounded-full overflow-hidden">
                                    <img src={user.image} alt="" className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium">{user.name}</h3>
                                    <p className="text-sm text-muted">{user.email}</p>
                                    <p className="text-sm text-muted capitalize bg-primary/10 px-2 py-1 rounded-full w-fit text-primary-2 mt-4">{user.role}</p>
                                </div>
                            </Link>
                        </Box>
                    ))
                ) : (
                    <div className="col-span-full flex items-center justify-center h-40 bg-background rounded-lg border border-line">
                        <div className="text-center">
                            <p className="text-muted-foreground mb-2">
                                {search || selectedRole !== "all" 
                                    ? "No users found matching your filters" 
                                    : "No users found"
                                }
                            </p>
                            {(search || selectedRole !== "all") && (
                                <button
                                    onClick={() => {
                                        setSearch("");
                                        setSelectedRole("all");
                                    }}
                                    className="text-sm text-primary-2 hover:underline"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}
