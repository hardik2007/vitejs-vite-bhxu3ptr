import { useState, useEffect, useRef } from "react";

interface TaskTracker {
  id: string;
  label: string;
}

interface DayData {
  day: number;
  tasks: TaskTracker[];
}

interface WeekData {
  week: number;
  theme: string;
  days: DayData[];
}

interface PhaseData {
  id: string;
  name: string;
  label: string;
  months: string;
  color: string;
  accent: string;
  weeks: WeekData[];
}

interface DayMapEntry {
  phase: string;
  week: number;
  day: number;
  tasks: TaskTracker[];
}

const PHASES: PhaseData[] = [
  {
    id: "p1",
    name: "Phase 1",
    label: "Foundation",
    months: "June – August 2026",
    color: "#4ade80",
    accent: "#166534",
    weeks: [
      {
        week: 1,
        theme: "Java Basics + Big-O",
        days: [
          {
            day: 1,
            tasks: [
              { id: "1-1", label: "Watch Kunal Kushwaha — Video 1: Introduction to Java & JVM" },
              { id: "1-2", label: "Karumanchi Ch 1: Read 'Introduction' (Big-O, Time & Space Complexity)" },
              { id: "1-3", label: "Write Big-O for 3 simple code snippets on paper" },
            ],
          },
          {
            day: 2,
            tasks: [
              { id: "2-1", label: "Watch Kunal — Video 2: Data Types, Variables, Input/Output" },
              { id: "2-2", label: "Karumanchi Ch 1: Finish remaining complexity examples" },
              { id: "2-3", label: "LeetCode #1: Two Sum (Easy) — don't look at solution for 20 min first" },
            ],
          },
          {
            day: 3,
            tasks: [
              { id: "3-1", label: "Watch Kunal — Video 3: Conditionals, Loops, Functions" },
              { id: "3-2", label: "Practice: Write factorial, fibonacci iteratively in Java" },
              { id: "3-3", label: "LeetCode #2: Contains Duplicate (Easy)" },
            ],
          },
          {
            day: 4,
            tasks: [
              { id: "4-1", label: "Watch Kunal — Video 4: Arrays in Java" },
              { id: "4-2", label: "Karumanchi Ch 3 (Linked Lists): Skip for now — just read the intro page" },
              { id: "4-3", label: "LeetCode #3: Best Time to Buy and Sell Stock (Easy)" },
            ],
          },
          {
            day: 5,
            tasks: [
              { id: "5-1", label: "Watch Kunal — Video 5: Strings in Java" },
              { id: "5-2", label: "Practice: Reverse a string, check palindrome in Java" },
              { id: "5-3", label: "LeetCode #4: Valid Anagram (Easy)" },
            ],
          },
          {
            day: 6,
            tasks: [
              { id: "6-1", label: "Watch Kunal — Video 6: 2D Arrays / Matrices" },
              { id: "6-2", label: "Practice: Matrix transpose, row-wise sum in Java" },
              { id: "6-3", label: "LeetCode #5: Maximum Subarray (Easy) — know Kadane's Algorithm after" },
            ],
          },
          {
            day: 7,
            tasks: [
              { id: "7-1", label: "REVISION DAY — Revise Big-O notes from Karumanchi Ch 1" },
              { id: "7-2", label: "Re-solve this week's LeetCode problems from scratch (no peeking)" },
              { id: "7-3", label: "Write a 1-page summary: what is time complexity, space complexity, O(n log n)" },
            ],
          },
        ],
      },
      {
        week: 2,
        theme: "Arrays Deep Dive",
        days: [
          {
            day: 8,
            tasks: [
              { id: "8-1", label: "Watch Kunal — Arrays: Two Pointer Technique video" },
              { id: "8-2", label: "Karumanchi Ch 1: Re-read any sections you found unclear" },
              { id: "8-3", label: "LeetCode #6: Two Sum II — Input Array Is Sorted (Medium)" },
            ],
          },
          {
            day: 9,
            tasks: [
              { id: "9-1", label: "Watch Kunal — Sliding Window video" },
              { id: "9-2", label: "Practice: Implement sliding window max manually in Java" },
              { id: "9-3", label: "LeetCode #7: Longest Substring Without Repeating Characters (Medium)" },
            ],
          },
          {
            day: 10,
            tasks: [
              { id: "10-1", label: "Watch Kunal — Prefix Sum video" },
              { id: "10-2", label: "Practice: Build prefix sum array for range queries in Java" },
              { id: "10-3", label: "LeetCode #8: Product of Array Except Self (Medium)" },
            ],
          },
          {
            day: 11,
            tasks: [
              { id: "11-1", label: "No new video — consolidation day" },
              { id: "11-2", label: "LeetCode #9: 3Sum (Medium) — 40 min attempt before hints" },
              { id: "11-3", label: "LeetCode #10: Container With Most Water (Medium)" },
            ],
          },
          {
            day: 12,
            tasks: [
              { id: "12-1", label: "Watch Kunal — Dutch National Flag / Partitioning Arrays video" },
              { id: "12-2", label: "Practice: Sort 0s, 1s, 2s in one pass (classic problem)" },
              { id: "12-3", label: "LeetCode #11: Sort Colors (Medium)" },
            ],
          },
          {
            day: 13,
            tasks: [
              { id: "13-1", label: "LeetCode #12: Subarray Sum Equals K (Medium)" },
              { id: "13-2", label: "LeetCode #13: Rotate Array (Medium)" },
              { id: "13-3", label: "Review all array patterns you've seen so far — note them down" },
            ],
          },
          {
            day: 14,
            tasks: [
              { id: "14-1", label: "REVISION DAY — Re-solve 3 problems from Week 2 from scratch" },
              { id: "14-2", label: "Write patterns list: Two Pointer, Sliding Window, Prefix Sum — when to use each" },
              { id: "14-3", label: "Read Karumanchi Ch 10 intro (Searching) — just the first 5 pages" },
            ],
          },
        ],
      },
      {
        week: 3,
        theme: "Binary Search",
        days: [
          {
            day: 15,
            tasks: [
              { id: "15-1", label: "Watch Kunal — Binary Search full video" },
              { id: "15-2", label: "Karumanchi Ch 10: Read Binary Search section completely" },
              { id: "15-3", label: "Implement Binary Search from scratch — both iterative & recursive" },
            ],
          },
          {
            day: 16,
            tasks: [
              { id: "16-1", label: "Watch Kunal — Binary Search on Answer concept video" },
              { id: "16-2", label: "LeetCode #14: Binary Search (Easy) — basics first" },
              { id: "16-3", label: "LeetCode #15: Search in Rotated Sorted Array (Medium)" },
            ],
          },
          {
            day: 17,
            tasks: [
              { id: "17-1", label: "LeetCode #16: Find First and Last Position in Sorted Array (Medium)" },
              { id: "17-2", label: "LeetCode #17: Search a 2D Matrix (Medium)" },
              { id: "17-3", label: "Practice: Binary search on answer — find square root of N without sqrt()" },
            ],
          },
          {
            day: 18,
            tasks: [
              { id: "18-1", label: "LeetCode #18: Koko Eating Bananas (Medium) — classic binary search on answer" },
              { id: "18-2", label: "LeetCode #19: Capacity To Ship Packages Within D Days (Medium)" },
              { id: "18-3", label: "Karumanchi Ch 10: Finish remaining searching problems" },
            ],
          },
          {
            day: 19,
            tasks: [
              { id: "19-1", label: "Watch Kunal — Sorting intro video (Bubble, Selection, Insertion)" },
              { id: "19-2", label: "Karumanchi Ch 11: Read Bubble Sort + Selection Sort sections" },
              { id: "19-3", label: "Implement all 3 basic sorts in Java from scratch" },
            ],
          },
          {
            day: 20,
            tasks: [
              { id: "20-1", label: "Watch Kunal — Merge Sort video" },
              { id: "20-2", label: "Karumanchi Ch 11: Read Merge Sort section" },
              { id: "20-3", label: "Implement Merge Sort in Java — trace through on paper first" },
            ],
          },
          {
            day: 21,
            tasks: [
              { id: "21-1", label: "REVISION DAY — Binary Search + Sorting week" },
              { id: "21-2", label: "Watch Kunal — Quick Sort video" },
              { id: "21-3", label: "Implement Quick Sort in Java. Note: when to use merge vs quick sort" },
            ],
          },
        ],
      },
      {
        week: 4,
        theme: "Sorting + Linked Lists Intro",
        days: [
          {
            day: 22,
            tasks: [
              { id: "22-1", label: "LeetCode #20: Sort an Array (Medium) — implement merge sort" },
              { id: "22-2", label: "Karumanchi Ch 11: Read Heap Sort and Counting Sort sections" },
              { id: "22-3", label: "LeetCode #21: Merge Intervals (Medium)" },
            ],
          },
          {
            day: 23,
            tasks: [
              { id: "23-1", label: "Watch Kunal — Linked Lists intro video" },
              { id: "23-2", label: "Karumanchi Ch 3: Read intro + Singly Linked List section" },
              { id: "23-3", label: "Implement Singly Linked List in Java (insert, delete, print)" },
            ],
          },
          {
            day: 24,
            tasks: [
              { id: "24-1", label: "Watch Kunal — Linked List operations video" },
              { id: "24-2", label: "Karumanchi Ch 3: Doubly Linked List section" },
              { id: "24-3", label: "LeetCode #22: Reverse Linked List (Easy)" },
            ],
          },
          {
            day: 25,
            tasks: [
              { id: "25-1", label: "Watch Kunal — Linked List problems video" },
              { id: "25-2", label: "CTCI Ch 2: Read all problems (attempt each before reading solution)" },
              { id: "25-3", label: "LeetCode #23: Detect Cycle in Linked List (Easy) — Floyd's algorithm" },
            ],
          },
          {
            day: 26,
            tasks: [
              { id: "26-1", label: "LeetCode #24: Merge Two Sorted Lists (Easy)" },
              { id: "26-2", label: "LeetCode #25: Reorder List (Medium)" },
              { id: "26-3", label: "LeetCode #26: LRU Cache (Medium) — uses LL + HashMap combo" },
            ],
          },
          {
            day: 27,
            tasks: [
              { id: "27-1", label: "Watch Kunal — Stacks video" },
              { id: "27-2", label: "Karumanchi Ch 4: Read Stacks section fully" },
              { id: "27-3", label: "Implement Stack using Array AND using Linked List in Java" },
            ],
          },
          {
            day: 28,
            tasks: [
              { id: "28-1", label: "REVISION DAY — Phase 1, Month 1 complete" },
              { id: "28-2", label: "Re-solve: Reverse LL, Detect Cycle, Valid Parentheses from scratch" },
              { id: "28-3", label: "Count total problems solved. Target by now: 26+ problems" },
            ],
          },
        ],
      },
      {
        week: 5,
        theme: "Stacks, Queues & Hashing",
        days: [
          {
            day: 29,
            tasks: [
              { id: "29-1", label: "Watch Kunal — Stack problems video" },
              { id: "29-2", label: "CTCI Ch 3: Stacks & Queues — read + attempt all problems" },
              { id: "29-3", label: "LeetCode #27: Valid Parentheses (Easy)" },
            ],
          },
          {
            day: 30,
            tasks: [
              { id: "30-1", label: "LeetCode #28: Min Stack (Medium)" },
              { id: "30-2", label: "LeetCode #29: Daily Temperatures (Medium) — monotonic stack" },
              { id: "30-3", label: "LeetCode #30: Largest Rectangle in Histogram (Hard) — attempt 30 min, then study solution" },
            ],
          },
          {
            day: 31,
            tasks: [
              { id: "31-1", label: "Watch Kunal — Queues video" },
              { id: "31-2", label: "Karumanchi Ch 5: Read Queues fully" },
              { id: "31-3", label: "Implement Queue using Array + Circular Queue in Java" },
            ],
          },
          {
            day: 32,
            tasks: [
              { id: "32-1", label: "Watch Kunal — Deque & Monotonic Queue video" },
              { id: "32-2", label: "LeetCode #31: Sliding Window Maximum (Hard) — study deque approach" },
              { id: "32-3", label: "LeetCode #32: Number of Recent Calls (Easy)" },
            ],
          },
          {
            day: 33,
            tasks: [
              { id: "33-1", label: "Watch Kunal — Hashing video" },
              { id: "33-2", label: "Karumanchi Ch 14: Read Hashing section" },
              { id: "33-3", label: "LeetCode #33: Two Sum (revisit with HashMap approach — different solution)" },
            ],
          },
          {
            day: 34,
            tasks: [
              { id: "34-1", label: "LeetCode #34: Group Anagrams (Medium)" },
              { id: "34-2", label: "LeetCode #35: Top K Frequent Elements (Medium)" },
              { id: "34-3", label: "LeetCode #36: Encode and Decode Strings (Medium)" },
            ],
          },
          {
            day: 35,
            tasks: [
              { id: "35-1", label: "REVISION DAY — Stacks, Queues, Hashing" },
              { id: "35-2", label: "Note patterns: When to use Stack vs Queue vs HashMap" },
              { id: "35-3", label: "Karumanchi Ch 2: Now properly read Recursion intro (2–3 sections)" },
            ],
          },
        ],
      },
      {
        week: 6,
        theme: "Recursion & Backtracking",
        days: [
          {
            day: 36,
            tasks: [
              { id: "36-1", label: "Watch Kunal — Recursion full video (watch twice if needed)" },
              { id: "36-2", label: "Karumanchi Ch 2: Read Recursion section fully" },
              { id: "36-3", label: "Practice: Factorial, Fibonacci, Power(x,n) recursively — draw recursion tree" },
            ],
          },
          {
            day: 37,
            tasks: [
              { id: "37-1", label: "Watch Kunal — Backtracking video" },
              { id: "37-2", label: "Karumanchi Ch 2: Read Backtracking section" },
              { id: "37-3", label: "LeetCode #37: Subsets (Medium) — classic backtracking template" },
            ],
          },
          {
            day: 38,
            tasks: [
              { id: "38-1", label: "LeetCode #38: Permutations (Medium)" },
              { id: "38-2", label: "LeetCode #39: Combination Sum (Medium)" },
              { id: "38-3", label: "Draw recursion trees for all 3 above problems on paper" },
            ],
          },
          {
            day: 39,
            tasks: [
              { id: "39-1", label: "LeetCode #40: Word Search (Medium) — backtracking on grid" },
              { id: "39-2", label: "LeetCode #41: Palindrome Partitioning (Medium)" },
              { id: "39-3", label: "CTCI Ch 8: Read Recursion section + attempt problems" },
            ],
          },
          {
            day: 40,
            tasks: [
              { id: "40-1", label: "LeetCode #42: N-Queens (Hard) — attempt 40 min, then study" },
              { id: "40-2", label: "LeetCode #43: Letter Combinations of Phone Number (Medium)" },
              { id: "40-3", label: "Note: Backtracking template — choose, explore, unchoose" },
            ],
          },
          {
            day: 41,
            tasks: [
              { id: "41-1", label: "PHASE 1 RECAP — Arrays, Sorting, Binary Search, LL, Stack, Queue, Hash, Recursion" },
              { id: "41-2", label: "Re-solve 1 problem from each topic — 8 problems total, speed run" },
              { id: "41-3", label: "Count total: Target 50+ problems by end of Phase 1 Month 2" },
            ],
          },
          {
            day: 42,
            tasks: [
              { id: "42-1", label: "REST / BUFFER DAY — catch up on any pending problems" },
              { id: "42-2", label: "Read Karumanchi Ch 6 intro (Trees) — just first 3 pages" },
              { id: "42-3", label: "Optional: Watch intro video on Trees from Kunal" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "p2",
    name: "Phase 2",
    label: "Core DSA",
    months: "September – December 2026",
    color: "#60a5fa",
    accent: "#1e3a5f",
    weeks: [
      {
        week: 7,
        theme: "Binary Trees",
        days: [
          {
            day: 43,
            tasks: [
              { id: "43-1", label: "Watch Kunal — Binary Trees intro + traversals video" },
              { id: "43-2", label: "Karumanchi Ch 6: Trees intro + Inorder, Preorder, Postorder" },
              { id: "43-3", label: "Implement all 3 traversals recursively in Java" },
            ],
          },
          {
            day: 44,
            tasks: [
              { id: "44-1", label: "Watch Kunal — Level Order Traversal / BFS on trees" },
              { id: "44-2", label: "Implement Level Order using Queue in Java" },
              { id: "44-3", label: "LeetCode #44: Binary Tree Level Order Traversal (Medium)" },
            ],
          },
          {
            day: 45,
            tasks: [
              { id: "45-1", label: "LeetCode #45: Invert Binary Tree (Easy)" },
              { id: "45-2", label: "LeetCode #46: Maximum Depth of Binary Tree (Easy)" },
              { id: "45-3", label: "LeetCode #47: Symmetric Tree (Easy)" },
            ],
          },
          {
            day: 46,
            tasks: [
              { id: "46-1", label: "Watch Kunal — Diameter, Height, Balance of Binary Tree" },
              { id: "46-2", label: "LeetCode #48: Diameter of Binary Tree (Easy)" },
              { id: "46-3", label: "LeetCode #49: Balanced Binary Tree (Easy)" },
            ],
          },
          {
            day: 47,
            tasks: [
              { id: "47-1", label: "CTCI Ch 4 Trees section — read + attempt all tree problems" },
              { id: "47-2", label: "LeetCode #50: Lowest Common Ancestor of Binary Tree (Medium)" },
              { id: "47-3", label: "LeetCode #51: Binary Tree Right Side View (Medium)" },
            ],
          },
          {
            day: 48,
            tasks: [
              { id: "48-1", label: "Watch Kunal — BST video" },
              { id: "48-2", label: "Karumanchi Ch 6: BST insert, delete, search" },
              { id: "48-3", label: "Implement BST from scratch in Java" },
            ],
          },
          {
            day: 49,
            tasks: [
              { id: "49-1", label: "LeetCode #52: Validate Binary Search Tree (Medium)" },
              { id: "49-2", label: "LeetCode #53: Kth Smallest Element in BST (Medium)" },
              { id: "49-3", label: "REVISION — all tree traversals from memory" },
            ],
          },
        ],
      },
      {
        week: 8,
        theme: "Heaps + Priority Queue",
        days: [
          {
            day: 50,
            tasks: [
              { id: "50-1", label: "Watch Kunal — Heaps and Priority Queue video" },
              { id: "50-2", label: "Karumanchi Ch 7: Priority Queue and Heaps — full chapter" },
              { id: "50-3", label: "Implement Min Heap from scratch in Java (insert + extract min)" },
            ],
          },
          {
            day: 51,
            tasks: [
              { id: "51-1", label: "Learn Java's PriorityQueue class — all operations" },
              { id: "51-2", label: "LeetCode #54: Kth Largest Element in Array (Medium)" },
              { id: "51-3", label: "LeetCode #55: Top K Frequent Elements (Medium) — heap approach" },
            ],
          },
          {
            day: 52,
            tasks: [
              { id: "52-1", label: "LeetCode #56: Find Median from Data Stream (Hard) — two heaps" },
              { id: "52-2", label: "LeetCode #57: Task Scheduler (Medium)" },
              { id: "52-3", label: "Karumanchi Ch 8: Disjoint Sets ADT — read fully" },
            ],
          },
          {
            day: 53,
            tasks: [
              { id: "53-1", label: "Watch Kunal — Union-Find / Disjoint Set video" },
              { id: "53-2", label: "Implement Union-Find with path compression in Java" },
              { id: "53-3", label: "LeetCode #58: Number of Connected Components (Medium)" },
            ],
          },
          {
            day: 54,
            tasks: [
              { id: "54-1", label: "LeetCode #59: Redundant Connection (Medium) — Union Find" },
              { id: "54-2", label: "LeetCode #60: Accounts Merge (Medium)" },
              { id: "54-3", label: "REVISION — Heap + Union Find patterns" },
            ],
          },
          {
            day: 55,
            tasks: [
              { id: "55-1", label: "Watch Kunal — Graphs intro video (terminology, representations)" },
              { id: "55-2", label: "Karumanchi Ch 9: Graph intro — adjacency matrix vs list" },
              { id: "55-3", label: "Implement Graph using adjacency list in Java" },
            ],
          },
          {
            day: 56,
            tasks: [
              { id: "56-1", label: "REVISION DAY — Trees, Heaps, Graphs intro" },
              { id: "56-2", label: "Re-solve: LCA, Kth Largest, Union Find problems from scratch" },
              { id: "56-3", label: "Read Karumanchi Ch 9: BFS section" },
            ],
          },
        ],
      },
      {
        week: 9,
        theme: "Graphs — BFS & DFS",
        days: [
          {
            day: 57,
            tasks: [
              { id: "57-1", label: "Watch Kunal — BFS on Graphs video" },
              { id: "57-2", label: "Implement BFS in Java — iterative with Queue" },
              { id: "57-3", label: "LeetCode #61: Number of Islands (Medium) — BFS approach" },
            ],
          },
          {
            day: 58,
            tasks: [
              { id: "58-1", label: "Watch Kunal — DFS on Graphs video" },
              { id: "58-2", label: "Karumanchi Ch 9: DFS section" },
              { id: "58-3", label: "LeetCode #62: Clone Graph (Medium)" },
            ],
          },
          {
            day: 59,
            tasks: [
              { id: "59-1", label: "CTCI Ch 4: Graphs section — read + attempt all problems" },
              { id: "59-2", label: "LeetCode #63: Pacific Atlantic Water Flow (Medium)" },
              { id: "59-3", label: "LeetCode #64: Surrounded Regions (Medium)" },
            ],
          },
          {
            day: 60,
            tasks: [
              { id: "60-1", label: "Watch Kunal — Topological Sort video" },
              { id: "60-2", label: "Karumanchi Ch 9: Topological Sort section" },
              { id: "60-3", label: "LeetCode #65: Course Schedule (Medium) — classic topo sort" },
            ],
          },
          {
            day: 61,
            tasks: [
              { id: "61-1", label: "LeetCode #66: Course Schedule II (Medium)" },
              { id: "61-2", label: "Watch Kunal — Dijkstra's Algorithm video" },
              { id: "61-3", label: "Karumanchi Ch 9: Dijkstra section" },
            ],
          },
          {
            day: 62,
            tasks: [
              { id: "62-1", label: "Implement Dijkstra using PriorityQueue in Java" },
              { id: "62-2", label: "LeetCode #67: Network Delay Time (Medium) — Dijkstra" },
              { id: "62-3", label: "LeetCode #68: Cheapest Flights Within K Stops (Medium)" },
            ],
          },
          {
            day: 63,
            tasks: [
              { id: "63-1", label: "REVISION DAY — Graphs week" },
              { id: "63-2", label: "Re-solve: Number of Islands + Course Schedule from scratch" },
              { id: "63-3", label: "Note: BFS vs DFS vs Dijkstra — when to use which" },
            ],
          },
        ],
      },
      {
        week: 10,
        theme: "Dynamic Programming — Part 1",
        days: [
          {
            day: 64,
            tasks: [
              { id: "64-1", label: "Watch Kunal — DP intro video (memoization vs tabulation)" },
              { id: "64-2", label: "Karumanchi Ch 19: DP intro + Fibonacci with memoization" },
              { id: "64-3", label: "CTCI Ch 8: DP section — read approach framework" },
            ],
          },
          {
            day: 65,
            tasks: [
              { id: "65-1", label: "Watch Striver — DP Day 1: Fibonacci + Climbing Stairs" },
              { id: "65-2", label: "LeetCode #69: Climbing Stairs (Easy) — all 3 approaches" },
              { id: "65-3", label: "LeetCode #70: House Robber (Medium)" },
            ],
          },
          {
            day: 66,
            tasks: [
              { id: "66-1", label: "Watch Striver — DP Day 2: Grid DP" },
              { id: "66-2", label: "LeetCode #71: Unique Paths (Medium)" },
              { id: "66-3", label: "LeetCode #72: Minimum Path Sum (Medium)" },
            ],
          },
          {
            day: 67,
            tasks: [
              { id: "67-1", label: "Watch Striver — DP Day 3: 0/1 Knapsack" },
              { id: "67-2", label: "Karumanchi Ch 19: 0/1 Knapsack section" },
              { id: "67-3", label: "Implement 0/1 Knapsack in Java — memoization first, then tabulation" },
            ],
          },
          {
            day: 68,
            tasks: [
              { id: "68-1", label: "LeetCode #73: Coin Change (Medium) — unbounded knapsack variant" },
              { id: "68-2", label: "LeetCode #74: Coin Change II (Medium)" },
              { id: "68-3", label: "LeetCode #75: Partition Equal Subset Sum (Medium)" },
            ],
          },
          {
            day: 69,
            tasks: [
              { id: "69-1", label: "Watch Striver — DP Day 4: LCS (Longest Common Subsequence)" },
              { id: "69-2", label: "Karumanchi Ch 19: LCS section" },
              { id: "69-3", label: "LeetCode #76: Longest Common Subsequence (Medium)" },
            ],
          },
          {
            day: 70,
            tasks: [
              { id: "70-1", label: "REVISION DAY — DP Part 1" },
              { id: "70-2", label: "Re-solve: Climbing Stairs, Knapsack, LCS from scratch — no notes" },
              { id: "70-3", label: "Write DP problem-solving framework: identify state, recurrence, base case" },
            ],
          },
        ],
      },
      {
        week: 11,
        theme: "Dynamic Programming — Part 2",
        days: [
          {
            day: 71,
            tasks: [
              { id: "71-1", label: "Watch Striver — DP Day 5: LIS (Longest Increasing Subsequence)" },
              { id: "71-2", label: "LeetCode #77: Longest Increasing Subsequence (Medium)" },
              { id: "71-3", label: "LeetCode #78: Russian Doll Envelopes (Hard) — attempt 30 min" },
            ],
          },
          {
            day: 72,
            tasks: [
              { id: "72-1", label: "Watch Striver — DP Day 6: Edit Distance" },
              { id: "72-2", label: "LeetCode #79: Edit Distance (Medium)" },
              { id: "72-3", label: "LeetCode #80: Distinct Subsequences (Hard) — study solution" },
            ],
          },
          {
            day: 73,
            tasks: [
              { id: "73-1", label: "Watch Striver — DP Day 7: Palindromic Subsequences" },
              { id: "73-2", label: "LeetCode #81: Longest Palindromic Subsequence (Medium)" },
              { id: "73-3", label: "LeetCode #82: Palindromic Substrings (Medium)" },
            ],
          },
          {
            day: 74,
            tasks: [
              { id: "74-1", label: "Watch Striver — DP Day 8: Stock Buy-Sell DP" },
              { id: "74-2", label: "LeetCode #83: Best Time to Buy/Sell Stock III (Hard)" },
              { id: "74-3", label: "LeetCode #84: Best Time to Buy/Sell Stock with Cooldown (Medium)" },
            ],
          },
          {
            day: 75,
            tasks: [
              { id: "75-1", label: "Watch Striver — DP Day 9: DP on Trees" },
              { id: "75-2", label: "LeetCode #85: House Robber III (Medium) — DP on tree" },
              { id: "75-3", label: "LeetCode #86: Diameter of Binary Tree (revisit with DP thinking)" },
            ],
          },
          {
            day: 76,
            tasks: [
              { id: "76-1", label: "LeetCode #87: Word Break (Medium)" },
              { id: "76-2", label: "LeetCode #88: Decode Ways (Medium)" },
              { id: "76-3", label: "CTCI Ch 8: Attempt all remaining DP problems" },
            ],
          },
          {
            day: 77,
            tasks: [
              { id: "77-1", label: "REVISION — Full DP review" },
              { id: "77-2", label: "Re-solve: Knapsack, LCS, LIS, Edit Distance from scratch" },
              { id: "77-3", label: "Count: Target 90+ problems total by end of Week 11" },
            ],
          },
        ],
      },
      {
        week: 12,
        theme: "Tries + String Algorithms",
        days: [
          {
            day: 78,
            tasks: [
              { id: "78-1", label: "Watch Kunal — Tries video" },
              { id: "78-2", label: "Karumanchi Ch 15: String Algorithms intro" },
              { id: "78-3", label: "Implement Trie (insert, search, startsWith) in Java" },
            ],
          },
          {
            day: 79,
            tasks: [
              { id: "79-1", label: "LeetCode #89: Implement Trie (Medium)" },
              { id: "79-2", label: "LeetCode #90: Word Search II (Hard) — Trie + Backtracking" },
              { id: "79-3", label: "LeetCode #91: Design Add and Search Words Data Structure (Medium)" },
            ],
          },
          {
            day: 80,
            tasks: [
              { id: "80-1", label: "Karumanchi Ch 15: KMP Pattern Matching section" },
              { id: "80-2", label: "LeetCode #92: Find the Index of the First Occurrence (Easy) — KMP" },
              { id: "80-3", label: "CTCI Ch 1: Arrays & Strings — attempt all problems" },
            ],
          },
          {
            day: 81,
            tasks: [
              { id: "81-1", label: "Karumanchi Ch 16: Algorithm Design Techniques — read Greedy intro" },
              { id: "81-2", label: "LeetCode #93: Jump Game (Medium) — greedy" },
              { id: "81-3", label: "LeetCode #94: Jump Game II (Medium)" },
            ],
          },
          {
            day: 82,
            tasks: [
              { id: "82-1", label: "CTCI Ch 5: Bit Manipulation — read + attempt all problems" },
              { id: "82-2", label: "LeetCode #95: Number of 1 Bits (Easy)" },
              { id: "82-3", label: "LeetCode #96: Single Number (Easy) — XOR trick" },
            ],
          },
          {
            day: 83,
            tasks: [
              { id: "83-1", label: "LeetCode #97: Missing Number (Easy)" },
              { id: "83-2", label: "LeetCode #98: Sum of Two Integers (Medium) — bit manipulation" },
              { id: "83-3", label: "CTCI Ch 6: Math & Logic Puzzles — read all" },
            ],
          },
          {
            day: 84,
            tasks: [
              { id: "84-1", label: "PHASE 2 COMPLETE — Major revision day" },
              { id: "84-2", label: "Speed run: 1 problem each from Trees, Graphs, DP, Trie, Heap" },
              { id: "84-3", label: "Count: Target 110+ problems total by end of Phase 2" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "p3",
    name: "Phase 3",
    label: "Mastery & Interview Mode",
    months: "January – May 2027",
    color: "#f472b6",
    accent: "#6b1030",
    weeks: [
      {
        week: 13,
        theme: "Speed & Pattern Recognition",
        days: [
          {
            day: 85,
            tasks: [
              { id: "85-1", label: "Start timed sessions: 45 min per problem, strict timer" },
              { id: "85-2", label: "LeetCode #99: 3Sum Closest (Medium) — timed" },
              { id: "85-3", label: "LeetCode #100: Trapping Rain Water (Hard) — timed" },
            ],
          },
          {
            day: 86,
            tasks: [
              { id: "86-1", label: "First Codeforces contest — Div 3 (register & participate)" },
              { id: "86-2", label: "Solve problems A & B at minimum" },
              { id: "86-3", label: "Post-contest: Understand editorial for every problem you couldn't solve" },
            ],
          },
          {
            day: 87,
            tasks: [
              { id: "87-1", label: "CTCI Ch 16: Moderate — attempt 5 problems" },
              { id: "87-2", label: "LeetCode #101: Word Ladder (Hard) — BFS" },
              { id: "87-3", label: "LeetCode #102: Alien Dictionary (Hard) — Topo sort" },
            ],
          },
          {
            day: 88,
            tasks: [
              { id: "88-1", label: "Mock interview on Pramp — schedule your first session" },
              { id: "88-2", label: "LeetCode #103: Merge K Sorted Lists (Hard)" },
              { id: "88-3", label: "LeetCode #104: Binary Tree Maximum Path Sum (Hard)" },
            ],
          },
          {
            day: 89,
            tasks: [
              { id: "89-1", label: "Revisit your 5 weakest problem types — re-solve 1 each" },
              { id: "89-2", label: "LeetCode #105: Serialize and Deserialize Binary Tree (Hard)" },
              { id: "89-3", label: "LeetCode #106: Design Twitter (Medium) — OOP + Heap" },
            ],
          },
          {
            day: 90,
            tasks: [
              { id: "90-1", label: "LeetCode Weekly Contest — participate (any day it falls)" },
              { id: "90-2", label: "CTCI Ch 16: Attempt 5 more moderate problems" },
              { id: "90-3", label: "Review your GitHub DSA notes — are they clean and organized?" },
            ],
          },
          {
            day: 91,
            tasks: [
              { id: "91-1", label: "REVISION — full Phase 3, Week 1" },
              { id: "91-2", label: "Mock interview with a classmate — 1 medium problem, 30 min" },
              { id: "91-3", label: "Read CTCI: The Interview Process chapter (front of book)" },
            ],
          },
        ],
      },
      {
        week: 14,
        theme: "Hard Problems + System Design Intro",
        days: [
          {
            day: 92,
            tasks: [
              { id: "92-1", label: "CTCI Ch 17: Hard — attempt 3 problems" },
              { id: "92-2", label: "LeetCode #107: Minimum Window Substring (Hard)" },
              { id: "92-3", label: "LeetCode #108: Longest Consecutive Sequence (Medium)" },
            ],
          },
          {
            day: 93,
            tasks: [
              { id: "93-1", label: "LeetCode #109: Regular Expression Matching (Hard) — DP" },
              { id: "93-2", label: "LeetCode #110: Burst Balloons (Hard) — interval DP" },
              { id: "93-3", label: "Codeforces Div 3 contest — participate" },
            ],
          },
          {
            day: 94,
            tasks: [
              { id: "94-1", label: "LeetCode #111: Median of Two Sorted Arrays (Hard)" },
              { id: "94-2", label: "LeetCode #112: Largest Rectangle in Histogram (Hard) — revisit" },
              { id: "94-3", label: "Pramp mock interview session #2" },
            ],
          },
          {
            day: 95,
            tasks: [
              { id: "95-1", label: "Read about System Design basics: scalability, load balancing, caching" },
              { id: "95-2", label: "CTCI Ch 9: System Design and Scalability — read fully" },
              { id: "95-3", label: "LeetCode #113: Design Hit Counter (Medium)" },
            ],
          },
          {
            day: 96,
            tasks: [
              { id: "96-1", label: "LeetCode #114: LFU Cache (Hard) — design problem" },
              { id: "96-2", label: "LeetCode #115: Find Median from Data Stream (Hard) — revisit" },
              { id: "96-3", label: "CTCI Ch 17: 3 more hard problems" },
            ],
          },
          {
            day: 97,
            tasks: [
              { id: "97-1", label: "LeetCode Weekly Contest" },
              { id: "97-2", label: "Post-contest review — understand all problems including unsolved" },
              { id: "97-3", label: "Count: Target 150+ problems total by mid-Phase 3" },
            ],
          },
          {
            day: 98,
            tasks: [
              { id: "98-1", label: "FINAL REVISION — Go through your entire notes from Day 1" },
              { id: "98-2", label: "Identify your top 3 weak areas — plan 1 extra problem each per week" },
              { id: "98-3", label: "Mock interview with classmate — 1 hard problem, full interview simulation" },
            ],
          },
        ],
      },
      {
        week: 15,
        theme: "Interview Simulation Mode",
        days: [
          {
            day: 99,
            tasks: [
              { id: "99-1", label: "Full mock interview: 2 problems in 60 min — simulate real interview" },
              { id: "99-2", label: "LeetCode #116: Minimum Cost to Connect Sticks (Medium)" },
              { id: "99-3", label: "LeetCode #117: Maximum Points on a Line (Hard)" },
            ],
          },
          {
            day: 100,
            tasks: [
              { id: "100-1", label: "DAY 100 — Milestone! Count total problems solved" },
              { id: "100-2", label: "Target: 180+ problems, 15+ Codeforces contests, 4+ mock interviews" },
              { id: "100-3", label: "Celebrate — then solve 3 hard problems because that's who you are now" },
            ],
          },
        ],
      },
    ],
  },
];

function buildDayMap(): Record<number, DayMapEntry> {
  const map: Record<number, DayMapEntry> = {};
  PHASES.forEach((phase) => {
    phase.weeks.forEach((week) => {
      week.days.forEach((day) => {
        map[day.day] = { phase: phase.id, week: week.week, day: day.day, tasks: day.tasks };
      });
    });
  });
  return map;
}

const DAY_MAP = buildDayMap();
const TOTAL_DAYS = Object.keys(DAY_MAP).length;

export default function DSATracker() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [expandedPhase, setExpandedPhase] = useState<string | null>("p1");
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [loaded, setLoaded] = useState<boolean>(false);
  const dayRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dsa_tracker_v1");
      if (saved) {
        const data = JSON.parse(saved);
        setChecked(data.checked || {});
        setCurrentDay(data.currentDay || 1);
        setExpandedPhase(data.expandedPhase || "p1");
        setExpandedWeek(data.expandedWeek || 1);
      }
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("dsa_tracker_v1", JSON.stringify({ checked, currentDay, expandedPhase, expandedWeek }));
    } catch {}
  }, [checked, currentDay, expandedPhase, expandedWeek, loaded]);

  const toggleTask = (taskId: string) => {
    setChecked((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const isDayComplete = (day: number) => {
    const dayData = DAY_MAP[day];
    if (!dayData) return false;
    return dayData.tasks.every((t) => checked[t.id]);
  };

  const totalCompleted = Object.values(checked).filter(Boolean).length;
  const totalTasks = Object.values(DAY_MAP).reduce((acc, d) => acc + d.tasks.length, 0);
  const progressPct = Math.round((totalCompleted / totalTasks) * 100);

  const completedDays = Object.keys(DAY_MAP).filter((d) => isDayComplete(parseInt(d))).length;

  const goToDay = (dayNum: number) => {
    const dayData = DAY_MAP[dayNum];
    if (!dayData) return;
    setCurrentDay(dayNum);
    // Find phase + week
    PHASES.forEach((phase) => {
      phase.weeks.forEach((week) => {
        if (week.days.some((d) => d.day === dayNum)) {
          setExpandedPhase(phase.id);
          setExpandedWeek(week.week);
        }
      });
    });
    setTimeout(() => {
      if (dayRefs.current[dayNum]) {
        dayRefs.current[dayNum]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  if (!loaded) return <div style={{ background: "#0a0a0f", minHeight: "100vh" }} />;

  return (
    <div style={{ background: "#0a0a0f", minHeight: "100vh", fontFamily: "'DM Mono', monospace", color: "#e2e8f0" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: #2d2d3d; border-radius: 2px; }
        .phase-btn { cursor: pointer; transition: all 0.2s; border: none; }
        .phase-btn:hover { opacity: 0.85; }
        .week-header { cursor: pointer; transition: background 0.15s; }
        .week-header:hover { background: rgba(255,255,255,0.04) !important; }
        .task-row { transition: background 0.15s; cursor: pointer; }
        .task-row:hover { background: rgba(255,255,255,0.03); }
        .day-jump:hover { opacity: 0.7; }
        .day-jump { cursor: pointer; transition: opacity 0.15s; }
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }
        .pulse { animation: pulse 2s infinite; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1e1e2e", padding: "24px 20px 20px", background: "#0d0d18" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff" }}>
                DSA MASTERY TRACKER
              </div>
              <div style={{ fontSize: 11, color: "#4a5568", marginTop: 4, letterSpacing: "0.05em" }}>
                HARDIKK · JIIT NOIDA · JUNE 2026 → MAY 2027
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: "#fff" }}>
                {progressPct}<span style={{ fontSize: 14, color: "#4a5568" }}>%</span>
              </div>
              <div style={{ fontSize: 10, color: "#4a5568", letterSpacing: "0.05em" }}>COMPLETE</div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 16, background: "#1a1a2e", borderRadius: 2, height: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg, #4ade80, #60a5fa, #f472b6)", transition: "width 0.4s ease", borderRadius: 2 }} />
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 24, marginTop: 14, flexWrap: "wrap" }}>
            {[
              { label: "DAYS DONE", val: `${completedDays}/${TOTAL_DAYS}` },
              { label: "TASKS DONE", val: `${totalCompleted}/${totalTasks}` },
              { label: "CURRENT DAY", val: `DAY ${currentDay}` },
              { label: "TARGET", val: "300+ PROBLEMS" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 10, color: "#4a5568", letterSpacing: "0.08em" }}>{s.label}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#a0aec0", marginTop: 2 }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "20px 16px" }}>
        {/* Quick jump */}
        <div style={{ marginBottom: 20, padding: "14px 16px", background: "#0d0d18", border: "1px solid #1e1e2e", borderRadius: 8 }}>
          <div style={{ fontSize: 10, color: "#4a5568", letterSpacing: "0.08em", marginBottom: 10 }}>QUICK JUMP TO DAY</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map((d) => (
              <div
                key={d}
                className="day-jump"
                onClick={() => goToDay(d)}
                style={{
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 500,
                  borderRadius: 4,
                  background: isDayComplete(d) ? "#166534" : d === currentDay ? "#1e3a5f" : "#1a1a2e",
                  color: isDayComplete(d) ? "#4ade80" : d === currentDay ? "#60a5fa" : "#4a5568",
                  border: d === currentDay ? "1px solid #60a5fa" : "1px solid transparent",
                }}
              >
                {d}
              </div>
            ))}
          </div>
        </div>

        {/* Phases */}
        {PHASES.map((phase) => {
          const isOpen = expandedPhase === phase.id;
          const phaseTaskIds = phase.weeks.flatMap((w) => w.days.flatMap((d) => d.tasks.map((t) => t.id)));
          const phaseChecked = phaseTaskIds.filter((id) => checked[id]).length;
          const phasePct = Math.round((phaseChecked / phaseTaskIds.length) * 100);

          return (
            <div key={phase.id} style={{ marginBottom: 16, border: `1px solid ${isOpen ? phase.color + "33" : "#1e1e2e"}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
              {/* Phase header */}
              <div
                className="phase-btn"
                onClick={() => setExpandedPhase(isOpen ? null : phase.id)}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", background: isOpen ? `${phase.color}08` : "#0d0d18" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 6, background: `${phase.color}18`, border: `1px solid ${phase.color}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 10, fontWeight: 800, color: phase.color, letterSpacing: "0.05em" }}>{phase.name.split(" ")[1]}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, color: "#fff" }}>{phase.label}</div>
                    <div style={{ fontSize: 10, color: "#4a5568", marginTop: 2 }}>{phase.months}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 800, color: phase.color }}>{phasePct}%</div>
                  <div style={{ fontSize: 10, color: "#4a5568", marginTop: 2 }}>{phaseChecked}/{phaseTaskIds.length} tasks</div>
                </div>
              </div>

              {isOpen && (
                <div style={{ padding: "0 0 8px" }}>
                  {phase.weeks.map((week) => {
                    const isWeekOpen = expandedWeek === week.week;
                    const weekTaskIds = week.days.flatMap((d) => d.tasks.map((t) => t.id));
                    const weekDone = weekTaskIds.filter((id) => checked[id]).length;
                    const weekComplete = weekDone === weekTaskIds.length;

                    return (
                      <div key={week.week} style={{ margin: "8px 12px", border: `1px solid ${isWeekOpen ? "#2d2d3d" : "#1a1a2e"}`, borderRadius: 8, overflow: "hidden" }}>
                        <div
                          className="week-header"
                          onClick={() => setExpandedWeek(isWeekOpen ? null : week.week)}
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", background: "#0d0d18" }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 20, height: 20, borderRadius: 4, background: weekComplete ? `${phase.color}22` : "#1a1a2e", border: `1px solid ${weekComplete ? phase.color : "#2d2d3d"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                              {weekComplete && <span style={{ color: phase.color, fontSize: 11 }}>✓</span>}
                            </div>
                            <div>
                              <div style={{ fontSize: 11, fontWeight: 500, color: "#a0aec0" }}>Week {week.week} — {week.theme}</div>
                              <div style={{ fontSize: 10, color: "#4a5568", marginTop: 1 }}>Days {week.days[0].day}–{week.days[week.days.length - 1].day}</div>
                            </div>
                          </div>
                          <div style={{ fontSize: 10, color: weekComplete ? phase.color : "#4a5568" }}>{weekDone}/{weekTaskIds.length}</div>
                        </div>

                        {isWeekOpen && (
                          <div style={{ padding: "4px 0 8px" }}>
                            {week.days.map((day) => {
                              const dayComplete = isDayComplete(day.day);
                              const isCurrent = currentDay === day.day;

                              return (
                                <div
                                  key={day.day}
                                  ref={(el) => { dayRefs.current[day.day] = el; }}
                                  style={{ margin: "6px 10px", border: `1px solid ${isCurrent ? phase.color + "55" : "#1e1e2e"}`, borderRadius: 6, overflow: "hidden", background: isCurrent ? `${phase.color}06` : "transparent" }}
                                >
                                  {/* Day header */}
                                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid #1a1a2e" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 12, fontWeight: 800, color: dayComplete ? phase.color : isCurrent ? "#fff" : "#4a5568" }}>
                                        DAY {day.day}
                                      </div>
                                      {isCurrent && <div style={{ fontSize: 9, color: phase.color, background: `${phase.color}18`, padding: "2px 6px", borderRadius: 3, letterSpacing: "0.05em" }} className="pulse">CURRENT</div>}
                                      {dayComplete && <div style={{ fontSize: 9, color: phase.color }}>✓ DONE</div>}
                                    </div>
                                    {!dayComplete && (
                                      <div
                                        onClick={() => setCurrentDay(day.day)}
                                        style={{ fontSize: 9, color: "#4a5568", cursor: "pointer", padding: "3px 8px", border: "1px solid #2d2d3d", borderRadius: 3, letterSpacing: "0.05em" }}
                                      >
                                        SET CURRENT
                                      </div>
                                    )}
                                  </div>

                                  {/* Tasks */}
                                  {day.tasks.map((task) => {
                                    const done = checked[task.id];
                                    return (
                                      <div
                                        key={task.id}
                                        className="task-row"
                                        onClick={() => toggleTask(task.id)}
                                        style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 12px", borderBottom: "1px solid #0f0f1a" }}
                                      >
                                        <div style={{ marginTop: 1, flexShrink: 0, width: 16, height: 16, borderRadius: 3, border: `1.5px solid ${done ? phase.color : "#2d2d3d"}`, background: done ? `${phase.color}22` : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s" }}>
                                          {done && <span style={{ color: phase.color, fontSize: 10, fontWeight: 700 }}>✓</span>}
                                        </div>
                                        <div style={{ fontSize: 12, lineHeight: 1.5, color: done ? "#4a5568" : "#a0aec0", textDecoration: done ? "line-through" : "none", transition: "all 0.15s" }}>
                                          {task.label}
                                        </div>
                                      </div>
                                    );
                                  })}

                                  {/* Mark day complete */}
                                  {!dayComplete && (
                                    <div
                                      onClick={() => {
                                        const updates: Record<string, boolean> = {};
                                        day.tasks.forEach((t) => (updates[t.id] = true));
                                        setChecked((prev) => ({ ...prev, ...updates }));
                                        if (DAY_MAP[day.day + 1]) setCurrentDay(day.day + 1);
                                      }}
                                      style={{ padding: "8px 12px", fontSize: 10, color: "#4a5568", cursor: "pointer", letterSpacing: "0.05em", textAlign: "center", borderTop: "1px solid #0f0f1a" }}
                                      className="day-jump"
                                    >
                                      MARK ALL DONE → ADVANCE TO NEXT DAY
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        <div style={{ padding: "20px 0", textAlign: "center", fontSize: 10, color: "#2d2d3d", letterSpacing: "0.08em" }}>
          PROGRESS SAVES AUTOMATICALLY · JIIT NOIDA → JPMC
        </div>
      </div>
    </div>
  );
}
