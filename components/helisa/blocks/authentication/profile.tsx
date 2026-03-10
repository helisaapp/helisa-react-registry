"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  avatarUrl?: string;
  initials?: string;
  displayName?: string;
  avatarDescription?: string;
  title?: string;
  isSubmitting?: boolean;
  children: React.ReactNode;
}

const Profile = ({
  open,
  onOpenChange,
  onSubmit,
  avatarUrl,
  initials,
  displayName,
  avatarDescription = "Actualice su información personal.",
  title = "Perfil de Usuario",
  isSubmitting = false,
  children,
}: ProfileProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Avatar className="size-20">
              <AvatarImage src={avatarUrl} alt="Avatar del usuario" />
              <AvatarFallback className="text-lg">
                {initials || "U"}
              </AvatarFallback>
            </Avatar>
          </div>
          {(displayName || avatarDescription) && (
            <div>
              {displayName && <p className="font-medium">{displayName}</p>}
              {avatarDescription && (
                <p className="text-sm text-muted-foreground">
                  {avatarDescription}
                </p>
              )}
            </div>
          )}
        </div>

        <form onSubmit={onSubmit} className="space-y-4 py-2">
          {children}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar cambios"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Profile;
