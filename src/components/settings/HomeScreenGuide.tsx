import { Share2, Smartphone } from "lucide-react";

export const HomeScreenGuide = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm border space-y-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Smartphone className="h-5 w-5" />
        Add to Home Screen
      </h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Install NelsonGPT on your device for quick access:
          </p>
          <div className="space-y-4">
            {/* iOS Instructions */}
            <div className="rounded-lg bg-blue-50 p-4">
              <h4 className="font-semibold mb-2">iOS Users</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Open Safari browser</li>
                <li>Tap the Share button <Share2 className="h-4 w-4 inline mx-1" /></li>
                <li>Scroll down and tap "Add to Home Screen"</li>
                <li>Tap "Add" to confirm</li>
              </ol>
            </div>
            
            {/* Android Instructions */}
            <div className="rounded-lg bg-green-50 p-4">
              <h4 className="font-semibold mb-2">Android Users</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                <li>Open Chrome browser</li>
                <li>Tap the menu (⋮)</li>
                <li>Tap "Add to Home screen"</li>
                <li>Tap "Add" to confirm</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};