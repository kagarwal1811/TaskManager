How long did you spend on the coding test?

Ans: 2 days

What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.

Ans: Search was the most useful feature that was added to the latest version.
```javascript
    <div className="search-bar">
                    <FiSearch/>
                    <input 
                        type="text" 
                        placeholder="Search tasks..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}/>
                    {searchQuery && (
                        <button className="clear-search" onClick={clearSearch}>
                            <RxCross1 />
                        </button>
                    )}
                </div>
```

How would you track down a performance issue in production? Have you ever had to do this?

Ans: I have not done anything upto production level but according to me the main problem could be-

Isolate the Root Cause

A/B Testing: Introduce changes incrementally to narrow down the cause.

Check Dependencies: Ensure third-party APIs, libraries, or services are performing as expected.

Infrastructure: Verify if the problem lies in server capacity, misconfigured load balancers, or network issues.

If you had more time, what additional features or improvements would you consider adding to the task management application?

Ans: Gamification and Motivation

Achievement Badges: Reward users for completing tasks or streaks.

Leaderboard: Create a friendly competition for team-based task management.

Daily/Weekly Challenges: Encourage users to complete a set number of tasks.

Backup and Recovery

Data Backup: Allow users to back up their tasks to the cloud.

Task History: Let users retrieve deleted or completed tasks.

