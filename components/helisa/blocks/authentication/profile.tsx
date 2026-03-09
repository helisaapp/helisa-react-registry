"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";

const Profile = () => {
  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Perfil de Usuario</DialogTitle>
          <DialogDescription>
            Aquí puedes ver y editar tu información de perfil.
          </DialogDescription>
        </DialogHeader>
        <section>
            <article>
                <p>Nombre: Juan Pérez</p>
            </article>
        </section>
        <DialogFooter>
            <Button variant="outline" onClick={() => alert("Edit profile clicked")}>
              Editar Perfil
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
