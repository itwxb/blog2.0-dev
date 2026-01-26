export const useSidebar = () => {
  const isSidebarCollapsed = useState('sidebar-collapsed', () => false)

  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }

  return {
    isSidebarCollapsed,
    toggleSidebar
  }
} 
