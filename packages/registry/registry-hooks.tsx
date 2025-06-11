import { UseBooleanExample } from "./components/hooks-example/useBooleanExample";
import { ComponentType } from "react";


type RegistryItem = {
  component: ComponentType;
  sourceCode?: string;
  description?: string;
};

// Registry object mapping hook names to their example components
export const registryHooks: Record<string, RegistryItem> = {
  "use-boolean": {
    component: UseBooleanExample,
    description: "A hook for managing boolean state with utility functions",
    sourceCode: `import { useBoolean } from "@/hooks/use-boolean";

export const UseBooleanExample = () => {
  const [value, { setValue, toggle, setTrue, setFalse, reset, getValue }] = useBoolean(false)

  return (
    <div className="space-y-4 p-4 border rounded-md">
      <div className="text-lg font-semibold">useBoolean Hook Example</div>
      
      <div className="flex items-center gap-2">
        <span className="font-medium">Current value:</span> 
        <span className={'px-2 py-1 rounded ' + (value ? "bg-green-100" : "bg-red-100")}>
          {value ? "true" : "false"}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={setTrue} 
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Set True
        </button>
        
        <button 
          onClick={setFalse} 
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Set False
        </button>
        
        <button 
          onClick={toggle} 
          className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Toggle
        </button>
        
        <button 
          onClick={reset} 
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset to Initial
        </button>
        
        <button 
          onClick={() => setValue(!getValue())} 
          className="px-3 py-1 bg-teal-500 text-white rounded hover:bg-teal-600"
        >
          Set to Opposite (using setValue + getValue)
        </button>
      </div>
      
      <div className="text-sm text-gray-500">
        This example demonstrates all methods provided by the useBoolean hook.
      </div>
    </div>
  )
}`
  },
};
