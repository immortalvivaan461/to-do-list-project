document.addEventListener("DOMContentLoaded", function () {
    // checkbox toggle logic
    window.toggleTaskDone = function (index) {
        const task = document.getElementById(`task-${index}`);
        if (task) {
            task.classList.toggle('done');
        }
    };

    // edit task logic
    window.editTask = function (index) {
        const task = document.getElementById(`task-${index}`);
        const currentText = task.textContent.trim();

        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentText.replace(/^\d+\.\s*/, '');
        input.id = `edit-input-${index}`;
        input.style.fontSize = '1.5rem';

        task.parentNode.replaceChild(input, task);

        input.focus();
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const newValue = input.value.trim();
                if (newValue.length === 0) return alert("Task can't be empty!");

                fetch(`/edit/${index}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ updatedTask: newValue })
                })
                    .then(res => {
                        if (res.ok) {
                            window.location.reload();
                        } else {
                            alert('Failed to update task.');
                        }
                    });
            }
        });
    };
});
