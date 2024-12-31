import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ChevronLeft, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { TelegramConnect } from "@/components/TelegramConnect"

export default function Settings() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleDeleteHistory = async () => {
    try {
      // Delete all messages using a simpler query
      const { error } = await supabase
        .from('messages')
        .delete()
        .not('id', 'is', null) // This will match all non-null IDs

      if (error) throw error

      toast({
        title: "History deleted",
        description: "Your chat history has been successfully cleared.",
      })

      // Navigate back to home page
      navigate('/')
    } catch (error) {
      console.error('Delete error:', error)
      toast({
        title: "Error",
        description: "Failed to delete chat history. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container max-w-2xl mx-auto p-4 space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <div className="space-y-4">
        <TelegramConnect />
        
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h2 className="font-semibold">Delete Chat History</h2>
            <p className="text-sm text-muted-foreground">
              This will permanently delete all your chat messages
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete History
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all your chat messages.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteHistory}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}