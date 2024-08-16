import React from 'react';

const useFilterDeadline = (tasks) => {

    const getStartOfWeek = (date) => {
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay()); // Set to Sunday of the current week
        start.setHours(0, 0, 0, 0); // Start of the day
        return start;
    };

    const getEndOfWeek = (date) => {
        const end = new Date(date);
        end.setDate(end.getDate() + (6 - end.getDay())); // Set to Saturday of the current week
        end.setHours(23, 59, 59, 999); // End of the day
        return end;
    };

    const getStartOfNextWeek = (date) => {
        const start = new Date(date);
        start.setDate(start.getDate() + (7 - start.getDay())); // Move to next Sunday
        start.setHours(0, 0, 0, 0); // Start of the day
        return start;
    };

    const getStartOfMonth = (date) => {
        const start = new Date(date);
        start.setDate(1); // First day of the month
        start.setHours(0, 0, 0, 0); // Start of the day
        return start;
    };

    const getEndOfMonth = (date) => {
        const end = new Date(date);
        end.setMonth(end.getMonth() + 1, 0); // Last day of the month
        end.setHours(23, 59, 59, 999); // End of the day
        return end;
    };

    const getStartOfNextMonth = (date) => {
        const start = new Date(date);
        start.setMonth(start.getMonth() + 1, 1); // First day of the next month
        start.setHours(0, 0, 0, 0); // Start of the day
        return start;
    };

    const getStartOfMonthAfterNext = (date) => {
        const start = new Date(date);
        start.setMonth(start.getMonth() + 2, 1); // First day of the month after next
        start.setHours(0, 0, 0, 0); // Start of the day
        return start;
    };

    const getEndOfYear = (date) => {
        const end = new Date(date);
        end.setMonth(11, 31); // Last day of the year
        end.setHours(23, 59, 59, 999); // End of the day
        return end;
    };

    const filterTasks = (taskToFilter, range) => {
        const now = new Date();
        let startDate, endDate;

        switch (range) {
            case 'past_due':
                startDate = new Date();
                startDate.setHours(startDate.getHours() - 1); // 1 hour ago
                endDate = now;
                break;
            case 'today':
                startDate = new Date();
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date();
                endDate.setHours(23, 59, 59, 999);
                break;
            case 'tomorrow':
                startDate = new Date();
                startDate.setDate(startDate.getDate() + 1);
                startDate.setHours(0, 0, 0, 0);
                endDate = new Date();
                endDate.setDate(endDate.getDate() + 1);
                endDate.setHours(23, 59, 59, 999);
                break;
            case 'this_week':
                const today = new Date();
                const tomorrow = new Date();
                tomorrow.setDate(today.getDate() + 1);
                startDate = getStartOfNextWeek(now); // Next week starts from the upcoming Sunday
                endDate = getEndOfWeek(now); // End of the current week (Saturday)
                // Adjust startDate to exclude today and tomorrow
                if (today.getDay() !== 0) { // If today is not Sunday
                    startDate.setDate(startDate.getDate() + 1); // Start from the day after tomorrow
                }
                endDate.setDate(endDate.getDate() - 1); // End before Saturday
                break;
            case 'this_month':
                startDate = getStartOfNextWeek(now); // Next Sunday
                endDate = getEndOfMonth(now); // End of the current month
                // Ensure startDate is the next Sunday
                if (now.getDay() === 0) { // If today is Sunday
                    startDate.setDate(startDate.getDate() + 1); // Start from the day after next Sunday
                }
                break;
            case 'next_month':
                startDate = getStartOfNextMonth(now);
                endDate = getEndOfMonth(startDate);
                break;
            case 'rest_of_year':
                startDate = getStartOfMonthAfterNext(now); // First day of the month after next
                endDate = getEndOfYear(now);
                break;
            case 'future':
                startDate = new Date(now.getFullYear() + 1, 0, 1); // First day of the next year
                endDate = null; // No end date
                break;
            default:
                throw new Error('Invalid range specified');
        }

        const filteredTasks = taskToFilter.filter(task => {
            const dueDate = new Date(task.due_date);
            const isNotCompleted = task.status !== 'completed';
            const isPastDue = dueDate < now && isNotCompleted;

            if (range === 'future') {
                return isNotCompleted && (dueDate >= startDate);
            }

            if (startDate && endDate) {
                return isNotCompleted && (dueDate >= startDate && dueDate <= endDate);
            }

            return isPastDue && range === 'past_due';
        });

        // Sort by due date
        return filteredTasks.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    };

    const dueToday = filterTasks(tasks, 'today');
    const dueTomorrow = filterTasks(tasks, 'tomorrow');
    const dueThisWeek = filterTasks(tasks, 'this_week');
    const dueThisMonth = filterTasks(tasks, 'this_month');
    const dueNextMonth = filterTasks(tasks, 'next_month');
    const duePastDue = filterTasks(tasks, 'past_due');
    const dueRestOfYear = filterTasks(tasks, 'rest_of_year');
    const dueFuture = filterTasks(tasks, 'future');

    // console.log('Due Today:', dueToday);
    // console.log('Due Tomorrow:', dueTomorrow);
    // console.log('Due This Week:', dueThisWeek);
    // console.log('Due This Month:', dueThisMonth);
    // console.log('Due Next Month:', dueNextMonth);
    // console.log('Past Due:', duePastDue);
    // console.log('Rest of Year:', dueRestOfYear);
    // console.log('Future:', dueFuture);

    return { duePastDue, dueToday, dueTomorrow, dueThisWeek, dueThisMonth, dueNextMonth, dueRestOfYear, dueFuture };
}

export default useFilterDeadline;
