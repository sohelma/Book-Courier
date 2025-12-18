import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    try {
      await axios.patch(`http://localhost:3000/users/role/${id}`, { role });
      setUsers(prev =>
        prev.map(u => (u._id === id ? { ...u, role } : u))
      );
      toast.success(`User role updated to ${role}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster position="top-right" toastOptions={{ duration: 1500 }} />

      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        All Users
      </h2>

      {loading ? (
        <p className="text-center py-10 text-gray-700 dark:text-gray-300">
          Loading users...
        </p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          No users found
        </p>
      ) : (
        <>
          {/* ===== DESKTOP TABLE ===== */}
          <div className="hidden md:block">
            <table className="w-full border border-gray-300 dark:border-gray-600 table-fixed">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="p-2 text-left w-[20%]">Name</th>
                  <th className="p-2 text-left w-[35%]">Email</th>
                  <th className="p-2 text-left w-[15%]">Role</th>
                  <th className="p-2 text-center w-[30%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                {users.map(user => (
                  <tr
                    key={user._id}
                    className="bg-white dark:bg-gray-800"
                  >
                    <td className="p-2 break-words text-gray-900 dark:text-gray-100">
                      {user.name}
                    </td>
                    <td className="p-2 break-words text-gray-700 dark:text-gray-300">
                      {user.email}
                    </td>
                    <td className="p-2 capitalize text-gray-800 dark:text-gray-200">
                      {user.role}
                    </td>
                    <td className="p-2">
                      <div className="flex justify-center gap-2 flex-wrap">
                        {user.role !== "librarian" && (
                          <button
                            onClick={() =>
                              updateRole(user._id, "librarian")
                            }
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                          >
                            Make Librarian
                          </button>
                        )}
                        {user.role !== "admin" && (
                          <button
                            onClick={() =>
                              updateRole(user._id, "admin")
                            }
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                          >
                            Make Admin
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== MOBILE CARD VIEW ===== */}
          <div className="grid gap-4 md:hidden">
            {users.map(user => (
              <div
                key={user._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                  {user.name}
                </h3>

                <p className="text-sm text-gray-500 break-words mb-1">
                  {user.email}
                </p>

                <p className="capitalize text-gray-700 dark:text-gray-300 mb-3">
                  Role: {user.role}
                </p>

                <div className="flex gap-2">
                  {user.role !== "librarian" && (
                    <button
                      onClick={() =>
                        updateRole(user._id, "librarian")
                      }
                      className="flex-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded"
                    >
                      Make Librarian
                    </button>
                  )}
                  {user.role !== "admin" && (
                    <button
                      onClick={() =>
                        updateRole(user._id, "admin")
                      }
                      className="flex-1 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                      Make Admin
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllUsers;
