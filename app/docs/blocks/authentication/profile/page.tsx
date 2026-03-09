'use client';

import Profile from "@/components/helisa/blocks/authentication/profile";
import { Button } from "@/components/ui/button";

const ProfilePage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Button
        type="button" 
        variant="outline"
        className="mb-4"
        onClick={() => window.history.back()}
      >
        Volver
      </Button>
      <Profile />
    </div>
  );
};

export default ProfilePage;
