import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MongoClient } from 'mongodb';
import { useSession } from "next-auth/react";

const Layout = ({ children }) => {
  const [minutes, setMinutes] = useState(0);
  const router = useRouter();

  const {data: session, loading} = useSession();

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes((prevMinutes) => prevMinutes + 1);
    }, 60000); // Increment minutes every 60 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  const userId = session?.user?.id;

  useEffect(() => {
    // Update the user's minutes spent in MongoDB
    const updateMinutesSpent = async () => {
      try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db();
        const collection = db.collection('users');
        await collection.updateOne(
          { id: userId }, // Replace with your user identifier
          { $push: { minutesSpent: minutes } }
        );
        client.close();
      } catch (error) {
        console.error('Error updating minutes spent:', error);
      }
    };

    updateMinutesSpent();
  }, [minutes, userId]);

  // Navigates to the requested page
  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div>
      {/* <nav>
        <ul className="flex space-x-4">
          <li>
            <button onClick={() => navigateTo('/')}>Home</button>
          </li>
          <li>
            <button onClick={() => navigateTo('/about')}>About</button>
          </li>
        </ul>
      </nav> */}
      {children}
      {/* <footer>
        <p>Minutes Spent: {minutes}</p>
      </footer> */}
    </div>
  );
};

export default Layout;
