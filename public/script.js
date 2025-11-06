                            document.addEventListener('DOMContentLoaded', function () {
                                const searchInput = document.querySelector('.ranking-search');
                                const clearSearch = document.querySelector('.clear-search');
                                const tableBody = document.getElementById('ranking-table-body');
                                const allRows = Array.from(tableBody.getElementsByClassName('row'));

                                function filterRows(searchTerm) {
                                    const normalizedSearchTerm = searchTerm.toLowerCase().trim();
                                    allRows.forEach(row => {
                                        const artist = row.querySelector('.song-details span:first-child').textContent.toLowerCase();
                                        const song = row.querySelector('.song-details .song').textContent.toLowerCase();
                                        const year = row.querySelector('.year-box').textContent.toLowerCase();

                                        if (artist.includes(normalizedSearchTerm) || song.includes(normalizedSearchTerm) || year.includes(normalizedSearchTerm)) {
                                            row.style.display = '';
                                        } else {
                                            row.style.display = 'none';
                                        }
                                    });

                                }

                                searchInput.addEventListener('keyup', function (event) {
                                    const searchTerm = event.target.value;
                                    filterRows(searchTerm);
                                    clearSearch.classList.toggle('visible', searchTerm);
                                });

                                clearSearch.addEventListener('click', function () {
                                    searchInput.value = '';
                                    filterRows('');
                                    clearSearch.classList.remove('visible');
                                });
                            });