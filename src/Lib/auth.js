import supabase from "./supabase"

export async function signUp(email, password, username="") {
    

  let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password
    })
    if(error){
      throw error
    }
    console.log('Auth signup successful:', data)

    if(data?.user) {
      const { data : sessionData } = await supabase.auth.getSession()

      if(!sessionData?.session) {
          console.log('No active session yet - profile will be created on first sign in')
          return data;
      }
  
   
    const displayName = username || email.split("@")[0];

  //   create profile

  const {data: profileData, error : profileError } = await supabase
  
      .from('users')
      .insert({
          id: data.user.id,
          username: displayName,
          avatar_url: null
      })
      .select()
      .single()

      if(profileError){
          console.error("profile creation error:", profileError)
      }else{
          console.log("Profile created successfully", profileData)
      }

  }

  return data



}

// signin function


export async function signIn(email, password) {

  let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    })

    console.log("user info ", data)

    if(error) throw error

  //   check if user profile exists , create if it doesn't

  if(data?.user){
      try{
          const profile = await getUserProfile(data.user.id);
          console.log("profile info ", profile)
      }catch(profileError){
          console.error('Error with profile during signin:', profileError)
      }
  }
}
export async  function getUserProfile(userId) {


  const { data : sessionData } = await supabase.auth.getSession()

  const { data , error } = await supabase.from('users')
      .select("*")
      .eq("id", userId)
      .single()

      // if user doest exist , create new one 

      if(error && error.code === "PGRST116"){
          console.log('No profile found, attempting to create one for user:', userId)

          

      // get user email to drive username if needed

      const { data : userData } = await supabase.auth.getUser();

      console.log("true data", userData)

      const email = userData?.user.email;

    
      
      const defaultUsername = email ? email.split("@")[0] : `user_${Date.now()}`;


      // create profile 

      const { data: newProfile, error : profileError } = await supabase
  
      .from('users')
      .insert({
          id: userId,
          username: defaultUsername,
          avatar_url: null
      })
      .select()
      .single()

      if(profileError){
          console.error("profile creation error:", profileError)
          throw profileError
      }else{
          console.log("Profile created successfully", newProfile)
      }

      return newProfile
      }


      // general error 
      if(error){
          console.error('Error fetching profile:', error)
          throw error
      }

      console.log("exiting profile")

      return data
}

export async function getAllUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*');

  if (error) {
    console.error('Error fetching users:', error);
    throw error;
  }

  return data;
}

export async function deleteUser(userId) {
  const { error } = await supabase
    .from('users')
    .delete()
    .eq('id', userId);

  if (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export const getUserCount = async () => {
  try {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return count;
  } catch (err) {
    console.error("Error getting user count:", err.message);
    return 0;
  }
};



export function onAuthChange(callback){

    const { data } = supabase.auth.onAuthStateChange((event, session) => {
            callback(session?.user || null, event)
    })

    return () => data.subscription.unsubscribe();
}

export async function signOut() {
    await supabase.auth.signOut()
  }