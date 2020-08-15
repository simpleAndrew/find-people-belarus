<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="js/demo_beta.js"></script>
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
  font-weight: bold;
  padding: 5px;
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
## Больницы
<div style="overflow-x:auto">
    <table id="hospital_result">
    <tr>
        <th>ФИО</th>
        <th>Возраст</th>
        <th>Больница</th>
        <th>Откуда прибыл</th>
        <th>Другое</th>
        <th>Обновлялось</th>
    </tr>
    </table>
</div>

## Места задержания
<div style="overflow-x:auto">
    <table id="result">
    <tr>
        <th>ФИО</th>
        <th>Дата Рождения</th>
        <th>Статус</th>
        <th>Другое</th>
        <th>Обновлялось</th>
    </tr>
    </table>
</div>