import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import { supabase } from "../lib/initSupabase";

interface Props {
  session: Session | null;
}

const Profile: React.FC<Props> = ({ session }: Props) => {
  const [username, setUsername] = useState<
    string | number | readonly string[] | undefined
  >("");

  async function getProfile() {
    try {
      const user = supabase.auth.user();
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function updateProfile() {
    try {
      const user = supabase.auth.user();
      const updates = {
        id: user?.id,
        username,
        updated_at: new Date(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <div className="container mx-auto grid place-content-center h-96">
      <p>Oh hi there {session?.user?.email}</p>
      <input
        className="my-4 border-2 border-gray-500 rounded-xl p-4 w-full"
        type="username"
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          updateProfile();
        }}
        className="w-full mt-4 p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
      >
        <span>Update profile</span>
      </button>
      <button
        className="mt-4 p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300"
        onClick={() => supabase.auth.signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
