# Tab Layout Restructure Plan

## Overview
Restructure the current tab layout to match the image design with a unified music tab containing filters for different content types.

## Current Structure
- **index**: Home screen (unchanged)
- **music**: Music content only
- **kids**: Kids content only  
- **podcast**: Podcast content only
- **help**: Help content (unchanged)

## Target Structure
- **index**: Home screen (unchanged)
- **music**: Unified content with filters (Music, Kids, Podcast)
- **help**: Help content (unchanged)
- **radio**: New radio content tab

## Phase 1: Update Tab Layout Structure

### Step 1: Modify `_layout.tsx`
**File**: `frontend/eldad/app/(tabs)/_layout.tsx`

**Changes**:
- Remove kids and podcast tabs
- Add radio tab
- Update music tab to "Bibliothèque" with library icon

**New Tab Configuration**:
```typescript
// index tab (unchanged)
title: "Acasa"
icon: "home"

// music tab (updated)
title: "Bibliothèque" 
icon: "bars" // stacked bars for library

// help tab (unchanged)
title: "Ajutoare"
icon: "heart"

// radio tab (new)
title: "Radio"
icon: "broadcast-tower"
```

### Step 2: Update Tab Icons and Labels
- Change music tab label from "Muzica" to "Bibliothèque"
- Change music tab icon from "music" to "bars" (stacked bars)
- Add radio tab with "broadcast-tower" icon

## Phase 2: Restructure Music Tab

### Step 3: Create Top Filter Bar
**Components to Create**:
- `FilterButton.tsx`: Individual filter button
- `FilterBar.tsx`: Container for filter buttons
- `useFilter.ts`: Hook for filter state management

**Filter Options**:
- "Muzica" (Music)
- "Kids" 
- "Podcast"

**Design**:
- Horizontal layout
- Rounded dark gray buttons
- White text
- Active state highlighting

### Step 4: Update Music Tab Content
**File**: `frontend/eldad/app/(tabs)/music.tsx`

**Changes**:
- Add filter bar at top
- Implement filter state management
- Modify content display based on selected filter
- Keep existing search functionality
- Integrate kids and podcast content

### Step 5: Create Filter Components

**FilterButton Component**:
```typescript
interface FilterButtonProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}
```

**FilterBar Component**:
```typescript
interface FilterBarProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}
```

**useFilter Hook**:
```typescript
interface UseFilterOptions {
  initialFilter: string;
  filters: string[];
}
```

## Phase 3: Create Radio Tab

### Step 6: Create Radio Tab Structure
**File**: `frontend/eldad/app/(tabs)/radio.tsx`

**Content Structure**:
- Header with "Radio" title
- Search functionality
- Radio station listings
- Play functionality for streams

**Sample Data**:
```typescript
const sampleRadioStations = [
  {
    id: "1",
    name: "Radio Eldad",
    genre: "Christian",
    isLive: true,
    listeners: 150
  },
  // ... more stations
];
```

### Step 7: Design Radio Tab UI
**Features**:
- Search bar for finding stations
- Station cards with live indicators
- Listeners count
- Play/pause functionality
- Genre categorization

## Phase 4: Content Migration

### Step 8: Move Kids Content
**Source**: `frontend/eldad/app/(tabs)/kids.tsx`
**Destination**: Music tab with "Kids" filter

**Migration Steps**:
1. Extract kids content data
2. Create kids content section in music tab
3. Apply kids-specific styling
4. Test filter functionality

### Step 9: Move Podcast Content
**Source**: `frontend/eldad/app/(tabs)/podcast.tsx`
**Destination**: Music tab with "Podcast" filter

**Migration Steps**:
1. Extract podcast content data
2. Create podcast content section in music tab
3. Apply podcast-specific styling
4. Test filter functionality

### Step 10: Update Navigation
**Files to Delete**:
- `frontend/eldad/app/(tabs)/kids.tsx`
- `frontend/eldad/app/(tabs)/podcast.tsx`

**Update Imports**:
- Remove any references to deleted files
- Update navigation logic

## Phase 5: Polish and Testing

### Step 11: Test Filter Functionality
**Test Cases**:
- Music filter shows only music content
- Kids filter shows only kids content  
- Podcast filter shows only podcast content
- Search works across all filtered content
- Filter state persists during navigation

### Step 12: Test Navigation
**Test Cases**:
- All tabs switch correctly
- Content loads properly for each tab
- Search functionality works in all tabs
- No broken links or references

### Step 13: UI/UX Polish
**Improvements**:
- Consistent styling across all tabs
- Smooth transitions between filters
- Loading states for content switching
- Empty states when no content found
- Proper error handling

## Implementation Order

1. **Step 1-2**: Update tab layout structure
2. **Step 6-7**: Create radio tab (new functionality)
3. **Step 3-5**: Create filter components
4. **Step 4**: Update music tab with filters
5. **Step 8-9**: Migrate kids and podcast content
6. **Step 10**: Clean up old files
7. **Step 11-13**: Testing and polish

## Files to Create

### New Files:
- `frontend/eldad/app/(tabs)/radio.tsx`
- `frontend/eldad/app/components/ui/FilterButton.tsx`
- `frontend/eldad/app/components/ui/FilterBar.tsx`
- `frontend/eldad/app/lib/useFilter.ts`

### Modified Files:
- `frontend/eldad/app/(tabs)/_layout.tsx`
- `frontend/eldad/app/(tabs)/music.tsx`
- `frontend/eldad/app/(tabs)/help.tsx` (unchanged)

### Files to Delete:
- `frontend/eldad/app/(tabs)/kids.tsx`
- `frontend/eldad/app/(tabs)/podcast.tsx`

## Success Criteria

- [ ] Tab layout matches image design
- [ ] Music tab has working filters for Music, Kids, Podcast
- [ ] Radio tab displays radio stations with search
- [ ] All content migrates successfully
- [ ] Search functionality works across all tabs
- [ ] No broken navigation or references
- [ ] UI is consistent and polished
- [ ] All tests pass

## Notes

- Keep existing search functionality intact
- Maintain current styling and theme
- Ensure backward compatibility where possible
- Test on both iOS and Android
- Consider performance implications of unified content 