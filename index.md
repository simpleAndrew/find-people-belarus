<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="js/demo.js"></script>
<style>
table {
  width: 100%;
}
th {
  height: 30px;
  text-align: left;
}
td {
  text-align: left;
  height: 20px;
}
tr:nth-child(even) {background-color: #fdfdf1}
</style>
# Поиск задержанных в Беларуси
 
<form id="target">
  <label>Фамилия</label>
  <input id="surname" type="text"/>
  <label>Год рождения</label>
  <input id="year" type="text"/>
  <button id="search_submit" type="button">Искать</button>
</form>

# Релзультаты
<div style="overflow-x:auto">
    <table id="result">
    <tr>
        <th>ФИО</th>
        <th>Дата Рождения</th>
        <th>Место содержания</th>
        <th>Дата задержания</th>
    </tr>
    </table>
    
</div>